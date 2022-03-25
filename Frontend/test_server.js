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

const events = new Array(5).fill(null).map((_, weekId) => new Array(genEvents[weekId].length).fill(null).map((_, id) => {
  const week = getWeek(dayjs(new Date(dayjs().year(), dayjs().month(), dayjs().date() + 7*weekId)));
  return {
    title: `Пример события ${id}`,
    beginTime: dayjs(new Date(dayjs(week[genEvents[weekId][id][0]]).year(), dayjs(week[genEvents[weekId][id][0]]).month(), dayjs(week[genEvents[weekId][id][0]]).date(), genEvents[weekId][id][1])).format('YYYY-MM-DDTHH:mm'),
    endTime: dayjs(new Date(dayjs(week[genEvents[weekId][id][0]]).year(), dayjs(week[genEvents[weekId][id][0]]).month(), dayjs(week[genEvents[weekId][id][0]]).date(), genEvents[weekId][id][2])).format('YYYY-MM-DDTHH:mm'),
    description: `description ${id}`,
    meetingLink: `meeting link ${id}`,
    isRepeating: false,
  };
}));

const server = http.createServer((req, res) => {
  console.log('request: ' + req.url, " method:", req.method, ' headers:', req.headers);
  
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, PUTCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length');

  switch (req.url) {
    case '/':
      res.writeHead(200, {'Content-Type': 'application/json'});
      const data = `{ "data": "data from server"}`;
      res.end(data);
      break;
    case '/event-processing/event/add':
      res.writeHead(200, {'Content-Type': 'application/json'});

      let data3 = "";
      req.on("data", chunk => {
          data3 += chunk;
      });
      req.on("end", () => {
        console.log('data3:', data3);
        res.end(data3);
      });
      break;
    case '/event-processing/events/all':
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(events));
      break;
    case '/user':
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(user));
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