
import Header from './Header';
import './App.css';
import useFetch from './useFetch'
import { Container, Segment, Dropdown, Input, Label, Menu } from 'semantic-ui-react';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";



function App() {

  const { metricDefinitions, loading, error } = useFetch("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions");
  const [restuarantIds, setRestaurantIds] = useState([]);
  const [fromHour, setFromHour] = useState('6');
  const [toHour, setToHour] = useState('29');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [compareType, setCompareType] = useState();


  const options = [
    { key: 'restaurantid1', text: 'Restaurant 1', value: '1' },
    { key: 'restaurantid2', text: 'Restaurant 2', value: '2' },
    { key: 'restaurantid3', text: 'Restaurant 3', value: '3' },
    { key: 'restaurantid4', text: 'Restaurant 4', value: '4' },
    { key: 'restaurantid5', text: 'Restaurant 5', value: '5' },
    { key: 'restaurantid6', text: 'Restaurant 6', value: '6' },
    { key: 'restaurantid7', text: 'Restaurant 7', value: '7' },
    { key: 'restaurantid8', text: 'Restaurant 8', value: '8' },
    { key: 'restaurantid9', text: 'Restaurant 9', value: '9' },
    { key: 'restaurantid10', text: 'Restaurant 10', value: '10' }
  ]

  const compareOptions = [
    { key: '1', text: '=', value: 'Equal' },
    { key: '2', text: '<=', value: 'LessThanOrEqual' },
    { key: '3', text: '>=', value: 'GreaterThanOrEqual' },
    { key: '4', text: '<', value: 'LessThan' },
    { key: '5', text: '>', value: 'GreaterThan' }
  ]

  const hours = [
    { key: '1', text: '6', value: '6' },
    { key: '2', text: '7', value: '7' },
    { key: '3', text: '8', value: '8' },
    { key: '4', text: '9', value: '9' },
    { key: '5', text: '10', value: '10' },
    { key: '6', text: '11', value: '11' },
    { key: '7', text: '12', value: '12' },
    { key: '8', text: '13', value: '13' },
    { key: '9', text: '14', value: '14' },
    { key: '10', text: '15', value: '15' },
    { key: '11', text: '16', value: '16' },
    { key: '12', text: '17', value: '17' },
    { key: '13', text: '18', value: '18' },
    { key: '14', text: '19', value: '19' },
    { key: '15', text: '20', value: '20' },
    { key: '16', text: '21', value: '21' },
    { key: '17', text: '22', value: '22' },
    { key: '18', text: '23', value: '23' },
    { key: '19', text: '24', value: '24' },
    { key: '20', text: '25', value: '25' },
    { key: '21', text: '26', value: '26' },
    { key: '22', text: '27', value: '27' },
    { key: '23', text: '28', value: '28' },
    { key: '24', text: '29', value: '29' }
  ]



  if (loading) return <h1>Loading...</h1>

  if (error) console.log(error);


  console.log(metricDefinitions);

  return (
    <Container>


      <Header />


      <Segment>

        {/*Resturent IDs */}
        <Dropdown placeholder='Restaurant Ids'
          fluid multiple selection
          options={options}
          value={restuarantIds}
          onChange={(event, data) => {
            setRestaurantIds(data.value)
          }} />

      </Segment>

      <Header title='Select Date and Time' />
      <Segment compact>

        {/*From Date */}
        <Input labelPosition='right' type='date' value={fromDate} onChange={(date) => {
          setFromDate(date);
        }}>
          <Label basic>From</Label>
          <input />
        </Input>


        {/*To Date */}
        <Input labelPosition='right' type='date' value={toDate} onChange={(date) => {
          setToDate(date);
        }}>
          <Label basic>To</Label>
          <input />
        </Input>

        {/** From and To hour*/}

        <Menu compact>
          <Label basic >FromHour</Label>
          <Dropdown
            fluid
            selection
            options={hours}
            value={fromHour}
            onChange={(event, data) => {
              setFromHour(data.value)
            }}
          />
        </Menu>

        <Menu compact>
          <Label basic >ToHour</Label>

          <Dropdown
            fluid
            selection
            options={hours}

            value={toHour}
            onChange={(event, data) => {
              setToHour(data.value)
            }}
          />
        </Menu>



      </Segment>

      {/*Metrics*/}
      <Segment compact>
        <Input labelPosition='right' type='Money' placeholder={'NetAmount'}>
              {/** Dropdown to choose copmpare operation options */}
        <Dropdown placeholder='Compare Operation'
            compact
            fluid
            selection
            options={compareOptions}

            value={compareType}
            onChange={(event, data) => {
              setCompareType(data.value)
            }}
          />

          <Label basic>$</Label>
          <input />
          <Label>.00</Label>

        </Input>

       


      </Segment>





    </Container>
  );
}

export default App;
