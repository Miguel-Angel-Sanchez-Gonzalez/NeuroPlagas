import React from "react";
import {
  Card,
  Metric,
  Text,
  Title,
  DonutChart,
  LineChart,
  DatePicker,
  CategoryBar,
  Legend,
  BarList,
  FunnelChart,
} from "@tremor/react";
import "./Dashboard.css"; // Importa el archivo CSS
import dataBarbie from "../../movie-barbie.json";
import dataOppenheimer from "../../movie-oppenheimer.json";

const Dashboard = () => {
  const chartData = dataBarbie.domestic_daily.map(({ revenue, date }) => {
    const oppenheimer = dataOppenheimer.domestic_daily.find(
      (opp) => opp.date === date
    );
    return {
      date,
      Barbie: revenue,
      Oppenheimer: oppenheimer?.revenue,
    };
  });

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sales = [
    { name: "New York", sales: 980 },
    { name: "London", sales: 456 },
    { name: "Hong Kong", sales: 390 },
    { name: "San Francisco", sales: 240 },
    { name: "Singapore", sales: 190 },
  ];

  const valueFormatter = (number) => `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  const datahero = [
    { name: '/home', value: 456 },
    { name: '/imprint', value: 351 },
    { name: '/cancellation', value: 51 },
  ];

  const chartdata = [
    { name: 'opens', value: 200 },
    { name: 'visitors', value: 351 },
    {
      name: "added to cart",
      value: 191,
    },
    { name: 'orders', value: 10 },
  ];

  return (
    <div className="main-div bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Section>
          <CardMetric title="Total Plagas" value={addCommasToNumber(dataBarbie.global_revenue)} />
          <CardDonut title="Plagas Distribution" data={sales} valueFormatter={valueFormatter} />
          
          <CardCategoryBar title="Product A Rating" value="42" values={[40, 30, 20, 10]} />
        </Section>

        <Section>
          <CardMetric title="Total Enfermedades" value={addCommasToNumber(dataOppenheimer.global_revenue)} />
          <CardDonut title="Enfermedades Distribution" data={sales} valueFormatter={valueFormatter} />
          
          <CardCategoryBar title="Product A Rating" value="42" values={[40, 30, 20, 10]} />
        </Section>

        <Section>
        <CardMetric title="Total Sanos" value="3,000" />
        <FunnelChart className="h-60" data={chartdata} onValueChange={(v) => console.log(v)} />
        
        <BarList
          data={datahero}
          sortOrder="ascending"
          className="mx-auto max-w-sm"
        />
        </Section>
      </div>

      <div className="text-center mb-8">
        <Text className="text-lg-medium">Seleccione una fecha</Text>
        <DatePicker />
        
      </div>

      <Card>
        <Title className="text-medium">Domestic Daily Revenue Comparison</Title>
        <LineChart
          className="mt-6"
          data={chartData}
          index="date"
          categories={["Barbie", "Oppenheimer"]}
          colors={["purple", "fuchsia"]}
          yAxisWidth={100}
          valueFormatter={addCommasToNumber}
        />
      </Card>
    </div>
  );
};

// COMPONENTES DE TREMOR

const Section = ({ title, children }) => (
  <div>
    <Title className="section-title">{title}</Title>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const CardDonut = ({ title, data, valueFormatter }) => (
  <Card className="max-w-full">
    <Title className="text-medium">{title}</Title>
    <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
      <DonutChart
        data={data}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
        className="w-40"
      />
      <Legend
        categories={data.map(item => item.name)}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
        className="max-w-xs"
      />
    </div>
  </Card>
);

const CardMetric = ({ title, value }) => (
  <Card className="max-w-full">
    <Text className="text-medium">{title}</Text>
    <Metric>{value}</Metric>
  </Card>
);

const CardCategoryBar = ({ title, value, values }) => (
  <Card className="max-w-full">
    <div className="flex items-center justify-between mb-4">
      <Text className="text-medium">{title}</Text>
      <Metric>{value}</Metric>
    </div>
    <CategoryBar
      values={values}
      colors={["emerald", "yellow", "orange", "rose"]}
      markerValue={value}
      className="mt-3"
    />
  </Card>
);

export default Dashboard;
