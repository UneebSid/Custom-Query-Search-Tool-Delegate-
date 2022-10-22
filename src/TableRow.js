import React from 'react'
import Restaurant from './Datafiles/RestaurantData.json'
import {Table} from 'semantic-ui-react'

const TableRow = ({datas}) => {

  if(datas==null){
    return  null
  }
else{
  return(

                datas?.map(data=>{
                    return(
                        <Table.Row>
                        <Table.Cell>
                      {data.restaurantId}
                      </Table.Cell>

                    
                      <Table.Cell>
                      {Restaurant.map(rest =>{
                        if (rest.Id===data.restaurantId){
                        return(
                          rest.Name
                        );
                        }
                      })}
                      </Table.Cell>
                     <Table.Cell>{data.busDt}</Table.Cell>

                    <Table.Cell>{data.orderNumber}</Table.Cell>

                    <Table.Cell>{data.orderTime}</Table.Cell>

                    <Table.Cell>${(data.totalAmount)}</Table.Cell>

                    <Table.Cell>${(data.netAmount)}</Table.Cell>

                    <Table.Cell>{data.itemSoldQty}</Table.Cell>

                    <Table.Cell>{data.beverageQty}</Table.Cell>

                    <Table.Cell>${(data.discountAmount)}</Table.Cell>

                    <Table.Cell>{(data.discountRatio*100)}%</Table.Cell>

                    <Table.Cell>${data.itemDeletedAmount}</Table.Cell>

                    <Table.Cell>${data.refundAmount}</Table.Cell>

                      </Table.Row>
                    )
                })
                      
                      );
              }
}



export default TableRow

