const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const EVENT_TYPE_ITEM = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const EVENT_CITY_ITEM = ['Paris','Moscow','Nagasaki','Amsterdam','Tokio','Valencia','Berlin','Helsinki','Barcelona','Belgrade'];
const DESTINATION_ID = ['23fb9425-bbfa-4a42-834c-9c3562395a0b', 'e06f7927-7148-49d0-ab08-8b55345eec78',
'3e57fdb2-5384-42c8-be7b-a2e751016573', '74f20b5f-c2ec-4799-8413-f510dfdb5531', 
'60f38293-a284-4951-b64c-3324965505a8','746934b1-be2e-4f2f-9979-1254b9a9429a',
'7bc1ed4f-b756-4c86-b5c9-a0724eacb554','b25e40f7-7731-48e1-9e3c-d5f2dbc385c9',
'f4041724-78e1-41a0-ae9a-12343f1763be', 'f1a6be00-7d8b-4245-8981-8d98e62b6b3c'
];
const DateFormat = {
  DATE_FORMATE: 'MMM DD',
  TIME_FORMAT: 'HH:mm'
};
// const EventTypeItem = {
//   TAXI: 'taxi',
//   BUS: 'bus',
//   TRAIN: 'train',
//   SHIP: 'ship',
//   DRIVE:'drive',
//   FLIGHT: 'flight',
//   CHECKIN: 'check-in',
//   SIGHTSEEING: 'sightseeing',
//   RESTAURANT: 'restaurant',
// };

export {FILTER_TYPES, SORT_TYPES, EVENT_TYPE_ITEM, EVENT_CITY_ITEM, DateFormat, DESTINATION_ID};
