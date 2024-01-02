"use client"

import React, { useCallback, useMemo, useState } from 'react'
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
import { htmlToSlate, slateToHtml } from '@slate-serializers/html'
import { withHistory } from 'slate-history'
import { Button, ButtonGroup } from '@nextui-org/react'
import { MdCode, MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatUnderlined, MdOutlineFormatAlignCenter, MdOutlineFormatAlignJustify, MdOutlineFormatAlignLeft, MdOutlineFormatAlignRight } from 'react-icons/md'
import { LuHeading1, LuHeading2, LuQuote } from "react-icons/lu";


export default function NewsEditor({ html, news, setNews }: any) {
	const renderElement = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => <Element {...props} />, [])
	const renderLeaf = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; leaf: any }) => <Leaf {...props} />, [])
	const editor = useMemo(() => withHistory(withReact(createEditor())), [])
	const filteredHtml = html.replace(/\\/g, '').replace(/^"(.*)"$/, '$1')
	const initialValue = useMemo(() => htmlToSlate(filteredHtml), [filteredHtml])
	const [value, setValue] = useState(slateToHtml(initialValue).toString())

	return (

		<Slate editor={editor} initialValue={initialValue}
			onChange={(v: any) => {
				setValue(slateToHtml(v))
				setNews({ ...news, articleContent: JSON.stringify(slateToHtml(v)) })
			}}>
			<Toolbar>
				<div className="flex flex-row gap-1">
					<MarkButton format="bold" icon={<MdFormatBold size={24} />} />
					<MarkButton format="italic" icon={<MdFormatItalic size={24} />} />
					<MarkButton format="underline" icon={<MdFormatUnderlined size={24} />} />
					<MarkButton format="code" icon={<MdCode size={24} />} />
					<BlockButton format="h1" icon={<LuHeading1 size={24} />} />
					<BlockButton format="h2" icon={<LuHeading2 size={24} />} />
					<BlockButton format="blockquote" icon={<LuQuote size={24} />} />
					<BlockButton format="ol" icon={<MdFormatListNumbered size={24} />} />
					<BlockButton format="ul" icon={<MdFormatListBulleted size={24} />} />
					<BlockButton format="left" icon={<MdOutlineFormatAlignLeft size={24} />} />
					<BlockButton format="center" icon={<MdOutlineFormatAlignCenter size={24} />} />
					<BlockButton format="right" icon={<MdOutlineFormatAlignRight size={24} />} />
					<BlockButton format="justify" icon={<MdOutlineFormatAlignJustify size={24} />} />
				</div>
			</Toolbar>
			<Editable
				className='border border-primary-300 p-2 border-solid rounded-md prose max-w-[900px] prose-stone dark:prose-invert text-neutral-300'
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				placeholder="Enter some rich text…"
				spellCheck
				autoFocus
				onKeyDown={event => {
					for (const hotkey in HOTKEYS) {
						if (isHotkey(hotkey, event as any)) {
							event.preventDefault()
							const mark: string = HOTKEYS[hotkey]
							toggleMark(editor, mark)
						}
					}
					if (event.key === 'Enter' && !event.shiftKey) {
						setTimeout(() => {
							//@ts-ignore
							Transforms.setNodes(editor, { type: 'paragraph' })
						}, 0)
					}

				}}
			/>
		</Slate>
	)
}


const Icon = ({ children }: any) => {
	return <span className="material-icons-outlined">{children}</span>
}

const Toolbar = ({ children }: any) => {
	return <div className="flex">{children}</div>
}

const HOTKEYS: Record<string, string> = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

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
			//@ts-ignore
			LIST_TYPES.includes(n.type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	})
	let newProperties: Partial<SlateElement>
	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			//@ts-ignore
			align: isActive ? undefined : format,
		}
	} else {
		newProperties = {
			//@ts-ignore
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
				//@ts-ignore
				n[blockType] === format,
		})
	)

	return !!match
}

const isMarkActive = (editor: BaseEditor, format: string | number) => {
	const marks = Editor.marks(editor)
	//@ts-ignore
	return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: any) => {
	const style = { textAlign: element.align }
	switch (element.type) {
		case 'blockquote':
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			)
		case 'ul':
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			)
		case 'h1':
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			)
		case 'h2':
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			)
		case 'li':
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			)
		case 'ol':
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
			variant={isMarkActive(editor, format) ? 'shadow' : 'light'}
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
			variant={isMarkActive(editor, format) ? 'shadow' : 'light'}
		>
			{icon}
		</Button>
	)
}
