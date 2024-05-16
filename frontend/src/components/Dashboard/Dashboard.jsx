import { useState } from 'react';
import { Card, Metric, Text, Title, DonutChart, LineChart, DatePicker  } from '@tremor/react';
import { es } from 'date-fns/locale';
import { CategoryBar } from '@tremor/react';
import './Dashboard.css';
import dataBarbie from '../../movie-barbie.json';
import dataOppenheimer from '../../movie-oppenheimer.json';


const Dashboard = () => {

const chartData = dataBarbie.domestic_daily.map(({ revenue, date }) => {
  const oppenheimer = dataOppenheimer.domestic_daily.find(opp => opp.date === date);
  return {
    date,
    Barbie: revenue,
    Oppenheimer: oppenheimer?.revenue,
  };
});

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const valor = 3000;
const valor2 = 42;



  return (
    <div className="text-left">
      <div className="grid grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Barbie</h2>
          



          <Card className="max-w-lg mb-6 h-30">
            <Title>Sales</Title>
            <DonutChart
              className="mt-6 mb-6 h-40"
              data={[
                {
                  name: 'false',
                  userScore: dataBarbie.vote_average,
                },
                {
                  name: 'false',
                  userScore: 10 - dataBarbie.vote_average,
                },
              ]}
              category="userScore"
              index="name"
              colors={['blue', 'slate']}
              label={`${(dataBarbie.vote_average * 10).toFixed()}%`}
            />
          </Card>

            <p className="text-center font-mono text-sm text-slate-500">
              Date Picker
            </p>
            <DatePicker />

          <Card className="max-w-xs mx-auto mb-6" decoration="top" decorationColor="indigo">
            <Text>Revenue</Text>
            <Metric>${addCommasToNumber(dataBarbie.global_revenue)}</Metric>
          </Card>

          <Card className="max-w-xs mx-auto mb-6" decoration="top" decorationColor="indigo">
            <Text>Budget</Text>
            <Metric>${valor}</Metric>
          </Card>

          <Card className="mx-auto max-w-sm">
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
              <span>Rating Product A</span>
              <span>${valor2}</span>
            </p>
            <CategoryBar
              values={[40, 30, 20, 10]}
              colors={['emerald', 'yellow', 'orange', 'rose']}
              markerValue={valor2}
              className="mt-3"
            />
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Oppenheimer</h2>
          <Card className="max-w-lg mb-6">
            <Title>Sales</Title>
            <DonutChart
              className="mt-6 mb-6"
              data={[
                {
                  name: 'false',
                  userScore: dataOppenheimer.vote_average,
                },
                {
                  name: 'false',
                  userScore: 10 - dataOppenheimer.vote_average,
                },
              ]}
              category="userScore"
              index="name"
              colors={['green', 'slate']}
              label={`${(dataOppenheimer.vote_average * 10).toFixed()}%`}
            />
          </Card>
          <Card className="max-w-xs mx-auto mb-6" decoration="top" decorationColor="indigo">
            <Text>Revenue</Text>
            <Metric>${addCommasToNumber(dataOppenheimer.global_revenue)}</Metric>
          </Card>
          <Card className="max-w-xs mx-auto mb-6" decoration="top" decorationColor="indigo">
            <Text>Budget</Text>
            <Metric>${addCommasToNumber(dataOppenheimer.budget)}</Metric>
          </Card>
        </div>
      </div>
      <Card className="mt-8">
        <Title>Domestic Daily</Title>
        <LineChart
          className="mt-6"
          data={chartData}
          index="year"
          categories={['Barbie', 'Oppenheimer']}
          colors={['pink', 'green']}
          yAxisWidth={120}
          valueFormatter={addCommasToNumber}
        />
      </Card>
    </div>
  );
}

export default Dashboard;
