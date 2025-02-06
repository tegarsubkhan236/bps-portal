type NewsItem = {
    news_id: number;
    newscat_id: string;
    newscat_name: string;
    title: string;
    news: string;
    rl_date: string;
    picture: string;
}

export const fetchNews = async (pageParam: number): Promise<{ data: NewsItem[]; nextPage: number | null }> => {
    const response = await fetch(
        `https://webapi.bps.go.id/v1/api/list/model/news/domain/0000/page/${pageParam}/key/${import.meta.env.VITE_BPS_API_KEY}`,
    );
    const {data} = await response.json();
    const [meta, newsData] = data;

    const totalPages = meta.pages ? meta.pages : 0;
    const nextPage = pageParam < totalPages ? pageParam + 1 : null;

    return {
        data: newsData,
        nextPage,
    };
}
