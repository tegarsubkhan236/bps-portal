import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticChart = ({ responseData }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const generateChartData = () => {
            const labels = [];
            const datasets = [];
            const data = responseData?.datacontent;

            if (data) {
                // Ambil daftar label 'vervar' dari response
                const vervarOptions = responseData?.vervar;

                // Menyusun data berdasarkan vervar_id yang ada
                const groupedData = vervarOptions.reduce((acc, vervarOption) => {
                    acc[vervarOption.val] = [];  // Inisialisasi array kosong untuk setiap vervar_id
                    return acc;
                }, {});

                // Proses data dan kelompokkan berdasarkan vervar_id
                Object.entries(data).forEach(([key, value]) => {
                    const vervarId = key.charAt(0);  // Ambil vervar_id dari key

                    if (groupedData[vervarId]) {
                        groupedData[vervarId].push(value);  // Masukkan value ke array yang sesuai
                    }
                });

                // Ambil data untuk setiap vervar_id
                vervarOptions.forEach((vervarOption, index) => {
                    const vervarLabel = vervarOption.label;

                    // Masukkan vervar_id dan label ke dalam datasets
                    datasets.push({
                        label: vervarLabel,
                        data: Object.keys(groupedData).map((vervarId) => {
                            // Ambil nilai data berdasarkan vervar_id yang sesuai
                            const dataForVervarId = groupedData[vervarId] || [];
                            return dataForVervarId[index] || 0;  // Jika tidak ada data, beri 0
                        }),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    });
                });

                // Membuat label untuk setiap kelompok vervar
                labels.push(...vervarOptions.map(option => option.label));  // Menambahkan vervar_id sebagai label untuk setiap grup
            }

            setChartData({
                labels: labels,
                datasets: datasets,
            });
        };

        generateChartData();
    }, [responseData]);

    return (
        <div>
            {chartData && <Bar data={chartData} options={{ responsive: true, scales: { x: { stacked: true }, y: { stacked: true } } }} />}
        </div>
    );
};

export default StatisticChart;
