import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

function SalesStats(){
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        async function getStats(){
            try{
                const response 
                    = await axios.get('http://localhost:8282/customer/product/stats' ); 
                    const data = {
                        labels: response.data.labels,
                        datasets: [
                            {
                                label: 'Sales',
                                data: response.data.data,
                                backgroundColor: [
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)'
                                  ],
                                  borderColor: [
                                    'rgb(255, 159, 64)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)'
                                  ],
                                  borderWidth: 1
                            }
                        ]
                    };

                    const options = {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    };
            
                    setChartData(data);
                    setChartOptions(options);
             }
            catch(err){
                 
            }  
        }

        getStats(); 
        
        
    }, []);

    return (
        <div className='container mt-4'> 
        <div className='rows'>
            <div className='col-md-9'>
                <div className="card">
                    <Chart type="bar" data={chartData} options={chartOptions} />
                </div>
            </div>
            
        </div>
       
        </div>
    )
}
export default SalesStats;