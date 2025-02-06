import {useQuery} from "@tanstack/react-query";

type TurVarItem = {
    label: string;
    value: number;
}

type useTurVarApiProp = {
    var_id: number
}

export const useTurVarApi = ({var_id}: useTurVarApiProp) => {
    const {data, isError, isPending, error} = useQuery({
        queryKey: ["turVarData"],
        queryFn: async (): Promise<TurVarItem[]> => {
            const response = await fetch(
                `https://webapi.bps.go.id/v1/api/list/model/turvar/var/${var_id}/domain/0000/nopage/1/key/${import.meta.env.VITE_BPS_API_KEY}`
            );

            const data = await response.json();
            console.log(data, var_id)

            return data.data[1].map((item: { turvar_id: number; turvar: string }) => ({
                label: item.turvar,
                value: item.turvar_id,
            }))
        },
    });

    return {data, isError, isPending, error};
};
