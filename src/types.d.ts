type NewsCardProps = {
	news: News;
	key: string;
};

type NewsData = {
	articleID: number;
	articleTitle: string;
	articleContent: string;
	articleImageURL: string;
	articlePublishedDate: string;
	articleView: number;
	categoryName: string;
	authorID: number;
};

type Category = {
	categoryID: number;
	categoryName: string;
};

type CategorySelectItem = {
	value: string;
	label: string;
};

type RegisterFormEntry = {
	name: string;
	surname: string;
	email: string;
	roleId: string | number;
};

type TopTenNews = {
	articleID: number;
	articleTitle: string;
	articleView: number;
};

type NewsColumnProps = {
	news: TopTenNews[];
};