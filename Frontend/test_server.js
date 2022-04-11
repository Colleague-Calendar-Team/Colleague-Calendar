const dayjs = require('dayjs');
const http = require('http');

const ip = '127.0.0.1';
const port = 5000;

const user = {
  password: '123',
  email: 'ivanov@mail.ru',
  phoneNumber: '+79161234567',
  telegramID: 'ivanov',
  name: 'Иван',
  surname: 'Иванов',
}

// фронт сейчас настроен на массив до 5 недель
// genEvents - какие события генерировать 1 число - номер столбца (дня) в Неделе, 2 число - начало (в часах), 3 число - конец (в часах) 
const genEvents = [[[0, 2, 7]], 
[[1, 2, 8], [1, 10, 13]],
[[0, 1, 3], [3, 7, 13], [3, 14, 15], [3, 23, 24], [6, 1, 24]],
[[3, 3, 5], [3, 6, 15]],
[[5, 1, 3], [5, 7, 13], [5, 14, 15], [5, 23, 24]]];

let eventID = -1;
const events = new Array(5).fill(null).map((_, weekId) => new Array(genEvents[weekId].length).fill(null).map((_, id) => {
  const week = getWeek(dayjs(new Date(dayjs().year(), dayjs().month(), dayjs().date() + 7*weekId)));
  eventID++;
  return {
    id: eventID,
    title: `Пример события ${eventID}`,
    beginTime: dayjs(new Date(dayjs(week[genEvents[weekId][id][0]]).year(), dayjs(week[genEvents[weekId][id][0]]).month(), dayjs(week[genEvents[weekId][id][0]]).date(), genEvents[weekId][id][1])).format('YYYY-MM-DDTHH:mm'),
    endTime: dayjs(new Date(dayjs(week[genEvents[weekId][id][0]]).year(), dayjs(week[genEvents[weekId][id][0]]).month(), dayjs(week[genEvents[weekId][id][0]]).date(), genEvents[weekId][id][2])).format('YYYY-MM-DDTHH:mm'),
    description: `description ${eventID}`,
    meetingLink: `meeting link ${eventID}`,
    isRepeating: false,
    owner: 'Иван',
    notificationTime:	10,
    notificationInTelegram:	false,
    notificationInEmail: true,
    notificationInSMS: false,
  };
}));

const server = http.createServer((req, res) => {
  let body = '';
  console.log('request: ' + req.url, " method:", req.method, ' headers:', req.headers, 'body:');
  
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length, Date, x-date, Accept');

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  switch (req.url) {
    case '/':
      res.writeHead(200, {'Content-Type': 'application/json'});
      const data = `{ "data": "data from server"}`;
      res.end(data);
      break;
    case '/events/add':
      body = '';
      req.on('data', (chunk) => {
          body += chunk;
      });
      req.on('end', () => {
          console.log(body);
  
          eventID++;
          res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
          res.write(eventID.toString());
          
          res.end();
      });
      break;
    case '/events/weeks':
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(events));
      break;
    case '/user/account':
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(user));
      break;
    case '/user/update/profile':
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('succesful update');
      break;
    case '/user/update/password':
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('succesful update');
      break;
    case '/user/update/avatar':
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('succesful update');
      break;
    case '/auth/logout':
      if (req.headers.authorization !== 'Bearer token') {
        res.writeHead(401, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write('User unathorized');
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write('success logout');
      }
      
      res.end();
      break;
    case '/user/1/workload':
      console.log('HEADERS:', req.headers['x-date']);
      const workloadNew = [{
        beginTime: '00:00',
        endTime: '5:46',
      }, {
        beginTime: '9:00',
        endTime: '12:30',
      }, {
        beginTime: '13:45',
        endTime: '15:25',
      }, {
        beginTime: '22:45',
        endTime: '00:00',
      }];
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(workloadNew));
      break;
    case '/user/Ivan/profiles':
      const searchUsers = [{userID: 3, name: 'Ivan', surname: 'Rodionov'}, {userID: 4, name: 'Ivan', surname: 'Romanov'}];
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(searchUsers));
      break;
    case '/auth/register':
      body = '';
      req.on('data', (chunk) => {
          body += chunk;
      });
      req.on('end', () => {
          console.log(body);
          const registerInfo = JSON.parse(body);
          if (registerInfo.name === "sveta") {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write('success registration');
          } else {
            res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write('Invalid user data provided for registration');
          }
          
          res.end();
      });
      break;
    case '/auth/login?login=sveta&password=123':
      res.writeHead(200, {'Content-Type': 'text/plain', 'Accept': 'text/plain'});
      res.end("token");
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found (from server)');
  }
});

server.listen(port, ip, () => {
  console.log(`Server running at https://${ip}:${port}/`);
});

function getWeek(day = dayjs()) {
  let curDate = dayjs(day).date() - dayjs(day).day() - (dayjs(day).day() === 0 ? 7 : 0);
  const month = dayjs(day).month();
  const year = dayjs(day).year();

  const weekDays = new Array(7).fill(null).map(() => {
    curDate++;
    return dayjs(new Date(year, month, curDate));
  });

  return weekDays;
}