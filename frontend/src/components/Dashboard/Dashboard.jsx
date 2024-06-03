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
  Button,
  Dialog, 
  DialogPanel,
  ProgressBar,
  BarList,
  FunnelChart,
} from "@tremor/react";
import { useEffect, useState } from "react";
import "./Dashboard.css"; // Importa el archivo CSS
import dataBarbie from "../../movie-barbie.json";
import dataOppenheimer from "../../movie-oppenheimer.json";
import ComboBoxGreenHouse from "./ComboBoxGreenHouse/ComboBoxGreenHouse";
import { RiInformationLine } from 'react-icons/ri';
import {RiQuestionnaireFill} from '@remixicon/react';


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
  const [numTratadas, setNumTratadas] = useState("0");
  const [numSinVer, setNumSinVer] = useState("0");


  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelectionChange = (
    selectedGreenhouseName,
    selectedGreenhouseId
  ) => {
    setSelectedGreenhouseId(selectedGreenhouseId);
    setSelectedGreenhouseName(selectedGreenhouseName);

    // Fetch Obtiene numero de plagas
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

    // Fetch Obtiene numero de enfermedades
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

      // Fetch Obtiene el estado de las imágenes
    fetch(
      `http://localhost:3000/dashboard/getTotalImagesAnalizedByStatus/${selectedGreenhouseId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          console.log("Invernadero sin datos de imágenes analizadas");
          setNumTratadas("0");
          setNumSinVer("0");
        } else {
          const tratada = data.find(item => item.Estado === "Tratada");
          const sinVer = data.find(item => item.Estado === "Sin ver");

          setNumTratadas(tratada ? tratada.Cantidad : "0");
          setNumSinVer(sinVer ? sinVer.Cantidad : "0");
        }
      })
      .catch((error) => {
        console.log("Invernadero sin datos de imágenes analizadas");
        setNumTratadas("0");
        setNumSinVer("0");
      });

  };

  // Calcula el porcentaje de amenazas tratadas
const totalAmenazas = parseInt(numTratadas) + parseInt(numSinVer);
const porcentajeTratadas = totalAmenazas > 0 ? (parseInt(numTratadas) / totalAmenazas) * 100 : 0;
const porcentajeSinVer = totalAmenazas > 0 ? (parseInt(numSinVer) / totalAmenazas) * 100 : 0;


  return (
    <div className="main-div bg-gray-100">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-3">
        <Text className="text-lg-medium md:mt-4">Seleccione invernadero</Text>
        <ComboBoxGreenHouse onChange={handleSelectionChange} />
        <Text className="text-lg-medium md:mt-4">Seleccione una fecha</Text>
        <DatePicker className="md:mt-4" maxDate={new Date()} />
        <Button
          variant="secondary"
          icon={RiQuestionnaireFill}
          onClick={() => setIsOpen(true)}
        >
          Ayuda
        </Button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
          <DialogPanel>
            <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Ayuda para el Usuario
            </h3>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              <strong>Seleccione Invernadero:</strong> Use la lista desplegable
              para elegir el invernadero que desea analizar. Al seleccionar un
              invernadero, los gráficos y datos se actualizarán para mostrar la
              información correspondiente a ese invernadero.
            </p>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              <strong>Seleccione una Fecha:</strong> Utilice el calendario para
              elegir una fecha. Puede seleccionar una fecha en el pasado para
              ver las plagas y enfermedades detectadas desde esa fecha hasta el
              día actual. Las fechas futuras no están disponibles para la
              selección.
            </p>
            <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>
              Entendido!
            </Button>
          </DialogPanel>
        </Dialog>
      </div>

      {selectedGreenhouseId ? (
        <>
          {/* Fila 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <Section>
              <CardMetric title="Total de Plagas" value={numPlagas} />
            </Section>

            <Section>
              <CardMetric
                title="Total de Enfermedades"
                value={numEnfermedades}
              />
            </Section>

            <Card className="mx-auto max-w-sm">
              <h5 className="mb-2">Estado de las Amenazas</h5>
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                <span> {porcentajeTratadas.toFixed(1)}% Tratado</span>
                <span>{porcentajeSinVer.toFixed(1)}% Sin ver</span>
              </p>
              <ProgressBar value={porcentajeTratadas} color="teal" className="mt-3" />
            </Card>

          </div>
          {/* Fila 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
            <Section>
              <CardDonut
                title={`Plagas en el ${selectedGreenhouseName}`}
                data={sales}
                valueFormatter={valueFormatter}
              />
            </Section>

            <Section>
              <CardDonut
                title={`Enfermedades en el ${selectedGreenhouseName}`}
                data={sales}
                valueFormatter={valueFormatter}
              />
            </Section>
          </div>

          <Card>
            <Title className="text-medium">
              Deteccion de Plagas y enfermedades a través del tiempo
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
