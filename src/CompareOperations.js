import React from 'react'
import {Form, Dropdown} from 'semantic-ui-react'
import {useState} from 'react';


const CompareOperations = () => {

    const [compareType, setCompareType] = useState();

    const compareOptions = [
        { key: '1', text: '=', value: 'Equal' },
        { key: '2', text: '<=', value: 'LessThanOrEqual' },
        { key: '3', text: '>=', value: 'GreaterThanOrEqual' },
        { key: '4', text: '<', value: 'LessThan' },
        { key: '5', text: '>', value: 'GreaterThan' }
      ]

  return (
    <Form.Field>
        <label>Select an operation</label>
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
    </Form.Field>
  )
}

export default CompareOperations
