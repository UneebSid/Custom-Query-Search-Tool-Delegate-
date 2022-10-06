
import Header from './Header';
import './App.css';
import { Container, Segment, Dropdown, Input, Label,Form } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import {ReactDatez} from 'react-datez';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';



function App() {

  {/*const { metricDefinition, loading, error } = useFetch("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions");*/}
  const [restuarantIds, setRestaurantIds] = useState([]);
  const [fromHour, setFromHour] = useState('6');
  const [toHour, setToHour] = useState('29');
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [compareType, setCompareType] = useState();
  const [metricDefinitions, setMetricDefinitions]= useState([]);
  const [metricCode, setMetricCode] = useState("");


  useEffect(()=>{
    getData("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions").then((data)=>{
      setMetricDefinitions(data);
    });
  },[])


  const RestaurantOptions = [
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

  const metricCodeOptions = metricDefinitions.map(metrics=>{
    return {
      key: metrics.metricCode,
      value: metrics.metricCode,
      text: metrics.alias
    }
  })

  const hours = [
    { key: '1', text: '6 (6 am)', value: '6' },
    { key: '2', text: '7 (7 am)', value: '7' },
    { key: '3', text: '8 (8 am)', value: '8' },
    { key: '4', text: '9 (9 am)', value: '9' },
    { key: '5', text: '10 (10 am)', value: '10' },
    { key: '6', text: '11 (11 am)', value: '11' },
    { key: '7', text: '12 (12 pm)', value: '12' },
    { key: '8', text: '13 (1 pm)', value: '13' },
    { key: '9', text: '14 (2 pm)', value: '14' },
    { key: '10', text: '15 (3 pm)', value: '15' },
    { key: '11', text: '16 (4 pm)', value: '16' },
    { key: '12', text: '17 (5 pm)', value: '17' },
    { key: '13', text: '18 (6 pm)', value: '18' },
    { key: '14', text: '19 (7 pm)', value: '19' },
    { key: '15', text: '20 (8 pm)', value: '20' },
    { key: '16', text: '21 (9 pm)', value: '21' },
    { key: '17', text: '22 (10 pm)', value: '22' },
    { key: '18', text: '23 (11 pm)', value: '23' },
    { key: '19', text: '24 (12 am next day)', value: '24' },
    { key: '20', text: '25 (1 am next day)', value: '25' },
    { key: '21', text: '26 (2 am next day)', value: '26' },
    { key: '22', text: '27 (3 am next day)', value: '27' },
    { key: '23', text: '28 (4 am next Day', value: '28' },
    { key: '24', text: '29 (5 am next day)', value: '29' }
  ]


  console.log(metricDefinitions);

  return (
    <Container>
      <Header title='Restaurant Query Search Tool' />
      <Segment>
        <Form>
          <Form.Field>
        {/*Resturent IDs */}
        <Dropdown placeholder='Restaurant Ids'
          fluid multiple selection
          options={RestaurantOptions}
          value={restuarantIds}
          onChange={(event, data) => {
            setRestaurantIds(data.value)
          }} />
          </Form.Field>

          <Form.Group>
            <Form.Field>
              <label>From Date</label>
              <ReactDatez 
                    name="dateInput"
                    handleChange={(value) => setFromDate(moment(value).format("YYYY-MM-DD"))}
                    value={fromDate}
                    allowPast={true}
                    dateFormat={"MM/DD/YYYY"}
                    placeholder={"MM-DD-YYYY"}
                    startDate={fromDate}
                    endDate={toDate}/>
            </Form.Field>

            <Form.Field>
              <label>To Date</label>
              <ReactDatez 
                    name="dateInput"
                    handleChange={(value) => setToDate(moment(value).format("YYYY-MM-DD"))}
                    value={toDate}
                    allowPast={true}
                    dateFormat={"MM/DD/YYYY"}
                    placeholder={"MM-DD-YYYY"}
                    startDate={fromDate}
                    endDate={toDate}/>

            </Form.Field>

            <Form.Field>
              <label>From Hour</label>
               
                 <Dropdown
                     fluid
                     selection
                     options={hours}
                     value={fromHour}
                     onChange={(event, data) => { setFromHour(data.value)}}
                     />
               
            </Form.Field>

            <Form.Field>
              <label>To Hour</label>
              <Dropdown
                 fluid
                 selection
                 options={hours}
                 value={toHour}
                 onChange={(event, data) => {
                               setToHour(data.value)
                           }}/>
            </Form.Field>

          </Form.Group>

          <Form.Group>
            
          </Form.Group>

        </Form>
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


async function getData(url){
  const response = await fetch(url, {
    method:"GET",
    cache:"no-cache"
  });
  return response.json();
}
export default App;
