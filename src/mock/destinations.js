import { getRandomArrayElement } from '../utils';
const destinations = [
  {
    id: '23fb9425-bbfa-4a42-834c-9c3562395a0b',
    description: 'Paris - with a beautiful old town',
    name: 'Paris',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/11.jpg',
        description: 'Paris middle-eastern paradise'
      }
    ]
  },
  {
    id: 'e06f7927-7148-49d0-ab08-8b55345eec78',
    description: 'Moscow - with a beautiful old town',
    name: 'Moscow',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/11.jpg',
        description: 'Moscow middle-eastern paradise'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/7.jpg',
        description: 'Moscow famous for its crowded street markets with the best street food in Asia'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/9.jpg',
        description: 'Moscow for those who value comfort and coziness'
      }
    ]
  },
  {
    id: '3e57fdb2-5384-42c8-be7b-a2e751016573',
    description: '',
    name: 'Nagasaki',
    pictures: []
  },
  {
    id: '74f20b5f-c2ec-4799-8413-f510dfdb5531',
    description: 'Amsterdam - middle-eastern paradise',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/10.jpg',
        description: 'Amsterdam in a middle of Europe'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/4.jpg',
        description: 'Amsterdam with crowded streets'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Amsterdam a true asian pearl'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Amsterdam for those who value comfort and coziness'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Amsterdam with a beautiful old town'
      }
    ]
  },
  {
    id: '60f38293-a284-4951-b64c-3324965505a8',
    description: 'Tokio - with a beautiful old town',
    name: 'Tokio',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/4.jpg',
        description: 'Tokio with a beautiful old town'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/1.jpg',
        description: 'Tokio in a middle of Europe'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Tokio with an embankment of a mighty river as a centre of attraction'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/20.jpg',
        description: 'Tokio with a beautiful old town'
      }
    ]
  },
  {
    id: '746934b1-be2e-4f2f-9979-1254b9a9429a',
    description: '',
    name: 'Valencia',
    pictures: []
  },
  {
    id: '7bc1ed4f-b756-4c86-b5c9-a0724eacb554',
    description: 'Kopenhagen - with crowded streets',
    name: 'Kopenhagen',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Kopenhagen is a beautiful city'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/9.jpg',
        description: 'Kopenhagen with crowded streets'
      }
    ]
  },
  {
    id: 'b25e40f7-7731-48e1-9e3c-d5f2dbc385c9',
    description: 'Berlin - full of of cozy canteens where you can try the best coffee in the Middle East',
    name: 'Berlin',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/11.jpg',
        description: 'Berlin in a middle of Europe'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/12.jpg',
        description: 'Berlin with a beautiful old town'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/14.jpg',
        description: 'Berlin a true asian pearl'
      }
    ]
  },
  {
    id: 'f4041724-78e1-41a0-ae9a-12343f1763be',
    description: 'Helsinki - with crowded streets',
    name: 'Helsinki',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Helsinki a true asian pearl'
      }
    ]
  },
  {
    id: 'f1a6be00-7d8b-4245-8981-8d98e62b6b3c',
    description: 'Barcelona - middle-eastern paradise',
    name: 'Barcelona',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/10.jpg',
        description: 'Barcelona with crowded streets'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/14.jpg',
        description: 'Barcelona in a middle of Europe'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/4.jpg',
        description: 'Barcelona in a middle of Europe'
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/1.jpg',
        description: 'Barcelona in a middle of Europe'
      }
    ]
  }
];

const getDestinations = () => destinations;

export {getDestinations};
