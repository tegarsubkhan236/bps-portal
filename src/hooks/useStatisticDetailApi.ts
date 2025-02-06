import {useQuery} from "@tanstack/react-query";

type X = {
    label: string;
    value: number;
}
type StatisticDetailItem = {
    turVar : X[],
    th : X[],
    turTh : X[],
}

type useStatisticDetailApiProp = {
    var_id: number
}

export const useStatisticDetailApi = ({ var_id }: useStatisticDetailApiProp) => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["statisticDetailData", var_id],
        queryFn: async (): Promise<StatisticDetailItem> => {
            const turvarResponse = await fetch(
                `https://webapi.bps.go.id/v1/api/list/model/turvar/var/${var_id}/domain/0000/nopage/1/key/${import.meta.env.VITE_BPS_API_KEY}`
            );
            const turvarData = await turvarResponse.json();

            const thResponse = await fetch(
                `https://webapi.bps.go.id/v1/api/list/model/th/var/${var_id}/domain/0000/key/${import.meta.env.VITE_BPS_API_KEY}`
            );
            const thData = await thResponse.json();

            const turthResponse = await fetch(
                `https://webapi.bps.go.id/v1/api/list/model/turth/var/${var_id}/domain/0000/nopage/1/key/${import.meta.env.VITE_BPS_API_KEY}`
            );
            const turthData = await turthResponse.json();

            return {
                turVar: turvarData?.data?.[1]
                    ? turvarData.data[1].map((item: { turvar_id: number; turvar: string }) => ({
                        label: item.turvar,
                        value: item.turvar_id,
                    }))
                    : [],
                th: thData?.data?.[1]
                    ? thData.data[1].map((item: { th_id: number; th: string }) => ({
                        label: item.th,
                        value: item.th_id,
                    }))
                    : [],
                turTh: turthData?.data?.[1]
                    ? turthData.data[1].map((item: { turth_id: number; turth: string }) => ({
                        label: item.turth,
                        value: item.turth_id,
                    }))
                    : [],
            };
        },
    });

    return { data, isError, isLoading, error };
};
