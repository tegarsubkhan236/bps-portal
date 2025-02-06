import {useMutation} from "@tanstack/react-query";

type FormDataType = {
    var_id: number,
    turvar_id?: number,
    th_id?: number,
    turth_id?: number
}

const useStatisticData = () => {
    return useMutation({
        mutationFn: async (formData: FormDataType) => {
            const { var_id, turvar_id, th_id, turth_id } = formData;

            let url = `https://webapi.bps.go.id/v1/api/list/model/data/domain/0000/var/${var_id}/key/${import.meta.env.VITE_BPS_API_KEY}`;

            if (turvar_id) {
                url += `/turvar/${turvar_id}`;
            }

            if (th_id) {
                url += `/th/${th_id}`;
            }

            if (turth_id) {
                url += `/turth/${turth_id}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = response.json();
            console.log(result)
            return result;
        },
    })
}

export default useStatisticData;


