
import Header from './Header';
import { getData, postRequest, dataFormating } from './functions.js';
import { Container, Segment, Dropdown, Input, Form, Table, Pagination } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { ReactDatez } from 'react-datez';
import Restaurant from './Datafiles/RestaurantData.json';
import "react-datepicker/dist/react-datepicker.css";
import { compareOptions, hoursOptions, RestaurantOptions } from './Options.js'
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

  const noOfRows = 20;
  const totalNumberOfPages = Math.ceil(searchedData.length / 20)
  let transactionDataPaginated = []

  //If current page is not yet the last page, there are more than 20 rows left to display
  if (activePage < totalNumberOfPages && activePage > 0) {
    transactionDataPaginated = searchedData.slice(activePage * noOfRows - noOfRows, activePage * noOfRows)
  }
  // If we are at the last page than there are only 20 or less rows left to display
  else if (activePage === totalNumberOfPages) {

    transactionDataPaginated = searchedData.slice(activePage * noOfRows - noOfRows)
  }

  const handlePaginationChange = (pageNumber) => {
    setActivePage(pageNumber)

  }


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

    postRequest("https://customsearchquerytoolapi.azurewebsites.net/Search/Query", input)
      .then((data) => {
        setSearchData(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }




  useEffect(() => {
    getData("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions")
      .then((data) => {
        setMetricDefinitions(data);
      });
  }, [])





  return (

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
                options={hoursOptions}
                value={fromHour}
                onChange={(event, data) => { setFromHour(data.value) }}
              />

            </Form.Field>

            <Form.Field>

              <label>To Hour</label>

              <Dropdown
                fluid
                selection
                options={hoursOptions}
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

            <Form.Field >

              <label>Value</label>

              {/** Input component to store user entered value for selected metric */}

              <Input
                type='number'
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
        {searchedData.length === 0 ? <p>No result</p> :
          <Table celled compact size='small' textAlign='left' fixed >
            <Table.Header>
              <Table.Row >
                <Table.HeaderCell  >
                  RestaurantId
              </Table.HeaderCell>
                <Table.HeaderCell  >
                  Restuarant Name
              </Table.HeaderCell>
                <Table.HeaderCell  >
                  Business Date
              </Table.HeaderCell>
                <Table.HeaderCell  >
                  Order Number
              </Table.HeaderCell>
                <Table.HeaderCell  >
                  Order Time
              </Table.HeaderCell>

                {metricDefinitions.map(md => {
                  return (
                    <Table.HeaderCell  >
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

                    {metricDefinitions.map(metr => {

                      const metricCodeName = metr.metricCode.charAt(0).toLowerCase() + metr.metricCode.slice(1);
                      return (<Table.Cell>{dataFormating(sd[metricCodeName], metr)}</Table.Cell>)
                    })}

                  </Table.Row>
                );

              })}
            </Table.Body>


            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='6'>
                  <Pagination
                    activePage={activePage}
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

  );
}


export default App;