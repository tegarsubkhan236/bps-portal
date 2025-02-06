import { useQuery } from "@tanstack/react-query";

type TreeDataItem = {
    label: string;
    value: number;
    children?: TreeDataItem[];
}

export const useStatisticsApi = () => {
    const { data, isError, isPending, error } = useQuery({
        queryKey: ["subjectData"],
        queryFn: async (): Promise<TreeDataItem[]> => {
            let totalPage = 1;
            let page = 1;
            const collection = [];

            while (page <= totalPage) {
                const response = await fetch(
                    `https://webapi.bps.go.id/v1/api/list/model/subject/domain/0000/page/${page}/key/${import.meta.env.VITE_BPS_API_KEY}`
                );

                if (response.ok) {
                    const data = await response.json();
                    collection.push(...data.data[1].map((item: { sub_id: number; title: string }) => ({
                        label: item.title,
                        value: item.sub_id,
                        children: [],
                    })));
                    totalPage = data.data[0].pages || totalPage;
                }

                page++;
            }

            return collection;
        },
    });

    const fetchChildren = async (subjectID: number): Promise<TreeDataItem[]> => {
        let totalPage = 1;
        let page = 1;
        const collection = [];

        while (page <= totalPage) {
            const response = await fetch(
                `https://webapi.bps.go.id/v1/api/list/model/var/domain/0000/subject/${subjectID}/page/${page}/key/${import.meta.env.VITE_BPS_API_KEY}`
            );

            if (response.ok) {
                const data = await response.json();
                collection.push(...data.data[1].map((item: { var_id: number; title: string }) => ({
                    label: item.title,
                    value: item.var_id,
                })));
                totalPage = data.data[0].pages || totalPage;
            }

            page++;
        }

        return collection;
    };

    const getChildren = async (node: {children: TreeDataItem[]; value: number}) => {
        if (!node.children || node.children.length === 0) {
            node.children = await fetchChildren(node.value);
        }
        return node.children;
    };

    return { data, isError, isPending, error, getChildren };
};
