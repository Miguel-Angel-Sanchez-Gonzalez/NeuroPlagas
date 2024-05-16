import { Card, Metric, Text, Title, DonutChart, LineChart, DatePicker, CategoryBar, Legend } from '@tremor/react';
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

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const valor = 3000;
  const valor2 = 42;

  const sales = [
    {
      name: 'New York',
      sales: 980,
    },
    {
      name: 'London',
      sales: 456,
    },
    {
      name: 'Hong Kong',
      sales: 390,
    },
    {
      name: 'San Francisco',
      sales: 240,
    },
    {
      name: 'Singapore',
      sales: 190,
    },
  ];
  
  const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

  return (
    <div className="text-left">
      <div className="grid grid-cols-2 gap-12">
        {/* Plagas */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Plagas</h2>

          {/* Componente de Dona */}
          <Card className="max-w-lg mb-6 h-30 text-tremor-content">
            <Title>Sales</Title>
            <div className="flex items-center justify-center space-x-6">
              <DonutChart
                data={sales}
                category="sales"
                index="name"
                valueFormatter={valueFormatter}
                colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                className="w-40"
              />
              <Legend
                categories={[
                  "New York",
                  "London",
                  "Hong Kong",
                  "San Francisco",
                  "Singapore",
                ]}
                colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                className="max-w-xs"
              />
            </div>
          </Card>

          {/* Componentes para mostrar un valor numérico de manera destacada (Metric) */}
          <Card className="max-w-xs mx-auto mb-6 decoration-top decorationColor-indigo">
            <Text>Revenue</Text>
            <Metric>${addCommasToNumber(dataBarbie.global_revenue)}</Metric>
          </Card>

          <Card className="max-w-xs mx-auto mb-6 decoration-top decorationColor-indigo">
            <Text>Budget</Text>
            <Metric>${valor}</Metric>
          </Card>

          {/* Componente CategoryBar (INDICES DE 0 A 100) */}
          <Card className="mx-auto max-w-sm">
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
              <span>Rating Product A</span>
              <span>${valor2}</span>
            </p>
            <CategoryBar
              values={[40, 30, 20, 10]}
              colors={["emerald", "yellow", "orange", "rose"]}
              markerValue={valor2}
              className="mt-3"
            />
          </Card>
        </div>

        {/* Enfermedades */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Enfermedades</h2>

          {/* Componente de Dona */}
          <Card className="max-w-lg mb-6 h-30 text-tremor-content">
            <Title>Sales</Title>
            <div className="flex items-center justify-center space-x-6">
              <DonutChart
                data={sales}
                category="sales"
                index="name"
                valueFormatter={valueFormatter}
                colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                className="w-40"
              />
              <Legend
                categories={[
                  "New York",
                  "London",
                  "Hong Kong",
                  "San Francisco",
                  "Singapore",
                ]}
                colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                className="max-w-xs"
              />
            </div>
          </Card>

          {/* Componente para mostrar un valor numérico de manera destacada (Metric) */}
          <Card className="max-w-xs mx-auto mb-6 decoration-top decorationColor-indigo">
            <Text>Revenue</Text>
            <Metric>
              ${addCommasToNumber(dataOppenheimer.global_revenue)}
            </Metric>
          </Card>
          <Card className="max-w-xs mx-auto mb-6 decoration-top decorationColor-indigo">
            <Text>Budget</Text>
            <Metric>${addCommasToNumber(dataOppenheimer.budget)}</Metric>
          </Card>

          {/* Componente CategoryBar (INDICES DE 0 A 100) */}
          <Card className="mx-auto max-w-sm">
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
              <span>Rating Product A</span>
              <span>${valor2}</span>
            </p>
            <CategoryBar
              values={[40, 30, 20, 10]}
              colors={["emerald", "yellow", "orange", "rose"]}
              markerValue={valor2}
              className="mt-3"
            />
          </Card>
        </div>
      </div>

      {/* Componente de Calendario */}
      <p className="text-center font-mono text-sm text-slate-600">
        Seleccione una fecha
      </p>
      <DatePicker />

      <Card className="mt-8">
        <Title>Domestic Daily</Title>
        <LineChart
          className="mt-6"
          data={chartData}
          index="date"
          categories={["Barbie", "Oppenheimer"]}
          colors={["pink", "green"]}
          yAxisWidth={100}
          valueFormatter={addCommasToNumber}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
