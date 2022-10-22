
import Header from './Header';
import TableRow from './TableRow'
import style from './index.js'
import { Container, Segment, Dropdown, Input, Form, Table, Search, Menu, Icon, TableCell, Pagination } from 'semantic-ui-react';
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
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [compareType, setCompareType] = useState();
  const [metricDefinitions, setMetricDefinitions] = useState([]);
  const [metricCode, setMetricCode] = useState("");
  const [compareValue, setCompareValue] = useState(0);
  const [searchedData, setSearchData] = useState([]);
  const [activePage, setActivePage] = useState(1)

  const totalNumberOfPages = Math.ceil(searchedData.length/20) 
  let transactionDataPaginated =[]

  if(activePage<totalNumberOfPages)  //If we are not yet at the last page, there are more than 20 rows left to display
  {
    transactionDataPaginated = searchedData.slice(activePage*20-20,activePage*20)
  }
  else if(activePage===totalNumberOfPages) // If we are at the last page than there are only 20 or less rows left to display
  {
    
    transactionDataPaginated = searchedData.slice(activePage*20-20)
  }

  const handlePaginationChange = (pageNumber) =>{
    setActivePage(pageNumber)
  
  }
  

  

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

  const submit = () => {
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


    postRequest("https://customsearchquerytoolapi.azurewebsites.net/Search/Query", input).then((data) => {
      setSearchData(data);
      


    }).catch((err) => {
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
 

  return (
    <body>
    <Container >
     
      <Header title='Restaurant Query Search Tool' />
      <Segment >
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
          {/* </Form.Group>

          <Form.Group> */}
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

            <Form.Field >

              <label>Value</label>

              {/** Input component to store user entered value for selected metric */}

              <Input
                type = 'number'
                value={compareValue}
                placeholder={'value'}
                onChange={(event, data) => {
                  setCompareValue(Number.parseInt(data.value));
                }}
              />

            </Form.Field>
          </Form.Group>

          <Form.Button color='black'>submit</Form.Button>
        </Form>
      </Segment>
      
      <Segment textAlign='center' floated='left' size='mini' color='green' >
        {searchedData.length===0? <p>No result</p>: 
           <Table celled compact size='small' textAlign ='left'>
            <Table.Header>
             <Table.Row>
              <Table.HeaderCell>
                RestaurantId
              </Table.HeaderCell>
              <Table.HeaderCell>
                Restuarant Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Business Date
              </Table.HeaderCell>
              <Table.HeaderCell>
                Order Number
              </Table.HeaderCell>
              <Table.HeaderCell>
                Order Time
              </Table.HeaderCell>

              {metricDefinitions.map(md => {
                return (
                  <Table.HeaderCell>
                    {md.alias}
                  </Table.HeaderCell>
                );

              })}


            </Table.Row>
          </Table.Header>
          <Table.Body>
          {transactionDataPaginated.map(sd => {
            return (
              <Table.Row>
                <Table.Cell>
                  {sd.restaurantId}
                </Table.Cell>
                <Table.Cell>
                  {Restaurant.map(rest => {
                    if (rest.Id === sd.restaurantId) {
                      return (
                        rest.Name
                      );
                    }
                  })}
                </Table.Cell>
                <Table.Cell>{sd.busDt}</Table.Cell>

                <Table.Cell>{sd.orderNumber}</Table.Cell>

                <Table.Cell>{sd.orderTime}</Table.Cell>

                {metricDefinitions.map(metr=>{

                  const  metricCodeName = metr.metricCode.charAt(0).toLowerCase() + metr.metricCode.slice(1);
                  return(<Table.Cell>{dataFormating(sd[metricCodeName], metr)}</Table.Cell>)
                })}

              </Table.Row>
            );

          })}
        </Table.Body>
          
          

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
               <Pagination
                  activePage ={activePage}
                  onPageChange={(event, data) => handlePaginationChange(data.activePage)}
                  totalPages={totalNumberOfPages}
               >
               </Pagination>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        }
      </Segment>
      
      

    </Container>
    </body>
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

function dataFormating(value, metricDefinition){
  let formatedData = "";
  switch (metricDefinition.dataType) {
    case "Money":
          formatedData = `$${value.toFixed(metricDefinition.decimalPlaces)}`
      break;
    case "Percent":
          formatedData = `${(value*100).toFixed(metricDefinition.decimalPlaces)}%`
      break;
    case "Number":
          formatedData = value.toFixed(metricDefinition.decimalPlaces)
      break;    
    
    default:
      break;
  }

  return formatedData;
}



export default App;


