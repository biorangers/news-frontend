"use client"

import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
	Editor,
	Transforms,
	createEditor,
	Descendant,
	Element as SlateElement,
	BaseEditor,
} from 'slate'
import { withHistory } from 'slate-history'

import { Button, ButtonGroup } from '@nextui-org/react'

import { MdCode, MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatUnderlined, MdOutlineFormatAlignCenter, MdOutlineFormatAlignJustify, MdOutlineFormatAlignLeft, MdOutlineFormatAlignRight } from 'react-icons/md'
import { LuHeading1, LuHeading2, LuQuote } from "react-icons/lu";


const Icon = ({ children }: any) => {
	return <span className="material-icons-outlined">{children}</span>
}

const Toolbar = ({ children }: any) => {
	return <div className="flex gap-2">{children}</div>
}

const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const RichTextExample = () => {
	const renderElement = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => <Element {...props} />, [])
	const renderLeaf = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; leaf: any }) => <Leaf {...props} />, [])
	const editor = useMemo(() => withHistory(withReact(createEditor())), [])

	return (
		<div className='flex justify-center flex-col items-center mt-20 '>
			<Slate editor={editor} initialValue={initialValue}>
				<Toolbar>
					<ButtonGroup>
						<MarkButton format="bold" icon={<MdFormatBold size={24} />} />
						<MarkButton format="italic" icon={<MdFormatItalic size={24} />} />
						<MarkButton format="underline" icon={<MdFormatUnderlined size={24} />} />
						<MarkButton format="code" icon={<MdCode size={24} />} />
						<BlockButton format="heading-one" icon={<LuHeading1 size={24} />} />
						<BlockButton format="heading-two" icon={<LuHeading2 size={24} />} />
						<BlockButton format="block-quote" icon={<LuQuote size={24} />} />
						<BlockButton format="numbered-list" icon={<MdFormatListNumbered size={24} />} />
						<BlockButton format="bulleted-list" icon={<MdFormatListBulleted size={24} />} />
						<BlockButton format="left" icon={<MdOutlineFormatAlignLeft size={24} />} />
						<BlockButton format="center" icon={<MdOutlineFormatAlignCenter size={24} />} />
						<BlockButton format="right" icon={<MdOutlineFormatAlignRight size={24} />} />
						<BlockButton format="justify" icon={<MdOutlineFormatAlignJustify size={24} />} />
					</ButtonGroup>
				</Toolbar>
				<Editable
					className='border border-primary-300 p-2 mt-2 border-solid rounded-md prose max-w-none prose-stone dark:prose-invert text-neutral-300'
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder="Enter some rich text…"
					spellCheck
					autoFocus
					onKeyDown={event => {
						for (const hotkey in HOTKEYS) {
							if (isHotkey(hotkey, event as any)) {
								event.preventDefault()
								const mark = HOTKEYS[hotkey]
								toggleMark(editor, mark)
							}
						}
					}}
				/>
			</Slate>
		</div>
	)
}

const toggleBlock = (editor: BaseEditor, format: string) => {
	const isActive = isBlockActive(
		editor,
		format,
		TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
	)
	const isList = LIST_TYPES.includes(format)

	Transforms.unwrapNodes(editor, {
		match: n =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			LIST_TYPES.includes(n.type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	})
	let newProperties: Partial<SlateElement>
	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			align: isActive ? undefined : format,
		}
	} else {
		newProperties = {
			type: isActive ? 'paragraph' : isList ? 'list-item' : format,
		}
	}
	Transforms.setNodes<SlateElement>(editor, newProperties)

	if (!isActive && isList) {
		const block = { type: format, children: [] }
		Transforms.wrapNodes(editor, block)
	}
}

const toggleMark = (editor: BaseEditor, format: string) => {
	const isActive = isMarkActive(editor, format)

	if (isActive) {
		Editor.removeMark(editor, format)
	} else {
		Editor.addMark(editor, format, true)
	}
}

const isBlockActive = (editor: BaseEditor, format: any, blockType = 'type') => {
	const { selection } = editor
	if (!selection) return false

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: n =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				n[blockType] === format,
		})
	)

	return !!match
}

const isMarkActive = (editor: BaseEditor, format: string | number) => {
	const marks = Editor.marks(editor)
	return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: any) => {
	const style = { textAlign: element.align }
	switch (element.type) {
		case 'block-quote':
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			)
		case 'bulleted-list':
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			)
		case 'heading-one':
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			)
		case 'heading-two':
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			)
		case 'list-item':
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			)
		case 'numbered-list':
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			)
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			)
	}
}

const Leaf = ({ attributes, children, leaf }: any) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>
	}

	if (leaf.code) {
		children = <code>{children}</code>
	}

	if (leaf.italic) {
		children = <em>{children}</em>
	}

	if (leaf.underline) {
		children = <u>{children}</u>
	}

	return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }: any) => {
	const editor = useSlate()
	return (
		<Button
			isIconOnly
			color={isBlockActive(
				editor,
				format,
				TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
			) ? 'primary' : 'default'}
			onClick={() => {
				toggleBlock(editor, format)
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	)
}

const MarkButton = ({ format, icon }: any) => {
	const editor = useSlate()
	return (
		<Button
			isIconOnly
			color={isMarkActive(editor, format) ? 'primary' : 'default'}
			onClick={() => {
				toggleMark(editor, format)
			}}
		>
			{icon}
		</Button>
	)
}
const document = new DOMParser().parseFromString(html, 'text/html')
deserialize(document.body)

const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [
			{ text: 'This is editable ' },
			{ text: 'rich', bold: true },
			{ text: ' text, ' },
			{ text: 'much', italic: true },
			{ text: ' better than a ' },
			{ text: '<textarea>', code: true },
			{ text: '!' },
		],
	},
	{
		type: 'paragraph',
		children: [
			{
				text: "Since it's rich text, you can do things like turn a selection of text ",
			},
			{ text: 'bold', bold: true },
			{
				text: ', or add a semantically rendered block quote in the middle of the page, like this:',
			},
		],
	},
	{
		type: 'block-quote',
		children: [{ text: 'A wise quote.' }],
	},
	{
		type: 'paragraph',
		align: 'center',
		children: [{ text: 'Try it out for yourself!' }],
	},
]

export default RichTextExample