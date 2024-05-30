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
import { useEffect, useState } from "react";
import "./Dashboard.css"; // Importa el archivo CSS
import dataBarbie from "../../movie-barbie.json";
import dataOppenheimer from "../../movie-oppenheimer.json";
import ComboBoxGreenHouse from "./ComboBoxGreenHouse/ComboBoxGreenHouse";

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

  const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  const datahero = [
    { name: "/home", value: 456 },
    { name: "/imprint", value: 351 },
    { name: "/cancellation", value: 51 },
  ];

  const chartdata = [
    { name: "opens", value: 200 },
    { name: "visitors", value: 351 },
    { name: "added to cart", value: 191 },
    { name: "orders", value: 10 },
  ];

  const [selectedGreenhouseId, setSelectedGreenhouseId] = useState(null);
  const [selectedGreenhouseName, setSelectedGreenhouseName] = useState("");
  const [numPlagas, setNumPlagas] = useState("0");
  const [numEnfermedades, setNumEnfermedades] = useState("0");

  const handleSelectionChange = (
    selectedGreenhouseName,
    selectedGreenhouseId
  ) => {
    setSelectedGreenhouseId(selectedGreenhouseId);
    setSelectedGreenhouseName(selectedGreenhouseName);

    fetch(
      `http://localhost:3000/dashboard/getTotalPlaguesByIdGreenhouse/${selectedGreenhouseId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNumPlagas(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch(
      `http://localhost:3000/dashboard/getTotalDiseasesByIdGreenhouse/${selectedGreenhouseId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNumEnfermedades(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    console.log("Nombre actual actualizado: " , selectedGreenhouseName);  
  };

  return (
    <div className="main-div bg-gray-100">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <Text className="text-lg-medium md:mt-4">Seleccione invernadero</Text>
        <ComboBoxGreenHouse onChange={handleSelectionChange} />
        <Text className="text-lg-medium md:mt-4">Seleccione una fecha</Text>
        <DatePicker className="md:mt-4" />
      </div>

      {selectedGreenhouseId ? (
        <>
          {/* Fila 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <Section>
              <CardMetric title="Total de Plagas" value={numPlagas} />
            </Section>

            <Section>
              <CardMetric title="Total de Enfermedades" value={numEnfermedades} />
            </Section>

            <Section>
              <Card className="mx-auto max-w-sm">
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                  <span>Estado del {selectedGreenhouseName}</span>
                  <span>{numPlagas}%</span>
                </p>
                <CategoryBar
                  values={[40, 30, 20, 10]}
                  colors={["emerald", "yellow", "orange", "rose"]}
                  markerValue={numPlagas}
                  className="mt-3"
                />
              </Card>
            </Section>
          </div>
          {/* Fila 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
            <Section>
              <CardDonut
                title={`Distribución de plagas en el invernadero ${selectedGreenhouseName}`}
                data={sales}
                valueFormatter={valueFormatter}
              />
            </Section>

            <Section>
              <CardDonut
                title={`Distribución de enfermedades en el invernadero ${selectedGreenhouseName}`}
                data={sales}
                valueFormatter={valueFormatter}
              />
            </Section>
          </div>

          <Card>
            <Title className="text-medium">
              Plagas y enfermedades a través del tiempo
            </Title>
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
        </>
      ) : (
        <Text className="text-lg-medium text-center mt-8">
          Por favor, seleccione un invernadero para ver los datos.
        </Text>
      )}
    </div>
  );
};

const Section = ({ children }) => (
  <div className="col-span-1 md:col-span-2 lg:col-span-1">{children}</div>
);

const CardMetric = ({ title, value }) => (
  <Card className="max-w-full">
    <Text className="text-medium">{title}</Text>
    <Metric>{value}</Metric>
  </Card>
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
        className="w-full md:w-2/5"
      />
      <Legend
        categories={data.map((item) => item.name)}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
        className="max-w-xs"
      />
    </div>
  </Card>
);

export default Dashboard;
