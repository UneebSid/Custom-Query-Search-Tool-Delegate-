import Restaurant from './Datafiles/RestaurantData.json';

export const compareOptions = [
  { key: '1', text: '=', value: 'Equal' },
  { key: '2', text: '<=', value: 'LessThanOrEqual' },
  { key: '3', text: '>=', value: 'GreaterThanOrEqual' },
  { key: '4', text: '<', value: 'LessThan' },
  { key: '5', text: '>', value: 'GreaterThan' }
]

export const hoursOptions = [
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
];


export   const RestaurantOptions = Restaurant.map(rest => {
  return {
    key: rest.Id,
    value: rest.Id,
    text: rest.Name
  }
});

