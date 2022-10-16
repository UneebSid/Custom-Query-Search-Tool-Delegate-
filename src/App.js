
import Header from './Header';
import './App.css';
import { Container, Segment, Dropdown, Input, Form } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { ReactDatez } from 'react-datez';
import Restaurant from './Datafiles/RestaurantData.json';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';



function App() {


  {/**State variables */ }
  const [restuarantIds, setRestaurantIds] = useState([]);
  const [fromHour, setFromHour] = useState(6);
  const [toHour, setToHour] = useState(29);
  const [fromDate, setFromDate] = useState("2021-10-1");
  const [toDate, setToDate] = useState("2021-10-31");
  const [compareType, setCompareType] = useState();
  const [metricDefinitions, setMetricDefinitions] = useState([]);
  const [metricCode, setMetricCode] = useState("");
  const [compareValue, setCompareValue] = useState(0);
  const [searchData, setSearchData] = useState([]);

  const RestaurantOptions = Restaurant.map(rest => {
    return {
      key: rest.Id,
      value: rest.Id,
      text: rest.Name
    }
  });

  const compareOptions = [
    { key: '1', text: '=', value: 'Equal' },
    { key: '2', text: '<=', value: 'LessThanOrEqual' },
    { key: '3', text: '>=', value: 'GreaterThanOrEqual' },
    { key: '4', text: '<', value: 'LessThan' },
    { key: '5', text: '>', value: 'GreaterThan' }
  ]

  const metricCodeOptions = metricDefinitions.map(metrics => {
    return {
      key: metrics.metricCode,
      value: metrics.metricCode,
      text: metrics.alias
    }
  })

  const submit = ()=>{  
    const input = {
      restaurantIds: restuarantIds,
      fromDate: fromDate,
      toDate: toDate,
      fromHour: fromHour,
      toHour: toHour,
      metricCriteria: [
        {
          "metricCode": metricCode,
          "compareType": compareType,
          "value": compareValue

        }
      ]
    }

      //console.log(`${JSON.stringify(input)}`)    
      postRequest("https://customsearchquerytoolapi.azurewebsites.net/Search/Query", input).then((data)=>{  
      setSearchData(data);
      console.log(data);
      
    }).catch((err)=>{
      console.log(err);
    })
  }

  


  useEffect(() => {
    getData("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions").then((data) => {
      setMetricDefinitions(data);
      
    });
  }, [])


  const hours = [
    { key: '1', text: '6 am', value: 6 },
    { key: '2', text: '7 am', value: 7 },
    { key: '3', text: '8 am', value: 8 },
    { key: '4', text: '9 am', value: 9 },
    { key: '5', text: '10 am', value: 10 },
    { key: '6', text: '11 am', value: 11 },
    { key: '7', text: '12 pm', value: 12 },
    { key: '8', text: '1 pm', value: 13 },
    { key: '9', text: '2 pm', value: 14 },
    { key: '10', text: '3 pm', value: 15 },
    { key: '11', text: '4 pm', value: 16 },
    { key: '12', text: '5 pm', value: 17 },
    { key: '13', text: '6 pm', value: 18 },
    { key: '14', text: '7 pm', value: 19 },
    { key: '15', text: '8 pm', value: 20 },
    { key: '16', text: '9 pm', value: 21 },
    { key: '17', text: '10 pm', value: 22 },
    { key: '18', text: '11 pm', value: 23 },
    { key: '19', text: '12 am (next day)', value: 24 },
    { key: '20', text: '1 am (next day)', value: 25 },
    { key: '21', text: '2 am (next day)', value: 26 },
    { key: '22', text: '3 am (next day)', value: 27 },
    { key: '23', text: '4 am (next Day', value: 28 },
    { key: '24', text: '5 am (next day)', value: 29 }
  ]

  console.log();

  return (
    <Container>
      <Header title='Restaurant Query Search Tool' />
      <Segment>
        <Form onSubmit={submit} >
          <Form.Field>

            {/*Resturents dropdown */}

            <label>Select Restaurants</label>

            <Dropdown

              placeholder='Restaurants'
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
                startDate={"10-01-2021"}
                endDate={"10-31-2021"} />

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
                startDate={"10-01-2021"}
                endDate={"10-31-2021"} />


            </Form.Field>

            <Form.Field>

              <label>From Hour</label>

              <Dropdown

                fluid
                selection
                options={hours}
                value={fromHour}
                onChange={(event, data) => { setFromHour(data.value) }}
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
                  setToHour(data.value);
                }} />
            </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field>

              <label>Metric criteria</label>

              <Dropdown

                fluid
                selection
                options={metricCodeOptions}
                value={metricCode}
                onChange={(event, data) => {
                  setMetricCode(data.value);

                }} />

            </Form.Field>

            <Form.Field>

              <label>CompareOperators</label>

              <Dropdown
                placeholder='Compare Operation'
                compact
                fluid
                selection
                options={compareOptions}
                value={compareType}
                onChange={(event, data) => {
                  setCompareType(data.value)
                }}
              />
            </Form.Field>

            <Form.Field>

              <label>Value</label>

              {/** Input component to store user entered value for selected metric */}

              <Input
                
                value={compareValue}
                placeholder={'amount'}
                onChange={(event, data) => {
                  setCompareValue(Number.parseInt(data.value));
                }}
              />

            </Form.Field>
          </Form.Group>

          <Form.Button>submit</Form.Button>
        </Form>
      </Segment>
    </Container>
  );
}


async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache"
  });
  return response.json();
}


async function postRequest(url, requestBody) {
   const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
       "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  return response.json()
  
}

export default App;
