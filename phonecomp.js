//--------------Phone Management--------------//
var currentQuery;

var Phone = (function() {
  Phone.list;
  Phone.popList = [];
  Phone.names = [];
  Phone.oneplus = [];

  function Phone(i) {
    this.index = i;
    this.name = Phone.list[i].Name;
    this.image = Phone.list[i].Image;
    this.link = Phone.list[i].Link;
    this.popularity = Phone.list[i].Popularity
    this.network = Phone.list[i].Network;
    this.launch = Phone.list[i].Launch;
    this.body = Phone.list[i].Body;
    this.display = Phone.list[i].Display;
    this.platform = Phone.list[i].Platform;
    this.memory = Phone.list[i].Memory;
    this.camera = Phone.list[i].Camera;
    this.sound = Phone.list[i].Sound;
    this.comms = Phone.list[i].Comms;
    this.features = Phone.list[i].Features;
    this.battery = Phone.list[i].Battery;
    this.misc = Phone.list[i].Misc;
  }

  Phone.loadPhones = function() {
    var h = new XMLHttpRequest;
    h.open('GET', d('phonelist').src);
    h.overrideMimeType('application/json');
    h.send();
    h.onload = function() {
      Phone.list = JSON.parse(h.response);
      for(var i=0; i<Phone.list.length; i++) {
        Phone.names[i] = Phone.list[i].Name;
        if(+Phone.list[i].Popularity >= 2 || +Phone.list[i].Popularity == NaN) Phone.popList.push(i);
        if(Phone.list[i].Name.indexOf('OnePlus') != -1){
          addOnePlus(new Phone(i));
          Phone.oneplus.push(i);
        }
      }
    }
  }

  function sortCandidates(a, b) { return b.score - a.score; }

  Phone.searchPhones = function(query, callback, max) {
    if(!query || !callback) return;
    currentQuery = query;
    setTimeout(function () {
      var c = [], s, o = [], x = 0;
      for(var i=0; i < Phone.list.length && query == currentQuery; i++) {
        //Get score of phone
        s = 0;
        s += score(Phone.names[i], query);
        if(s == 0) {
          for(var n in Phone.list[i].Network) { s += score(Phone.list[i].Network[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Launch) { s += score(Phone.list[i].Launch[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Body) { s += score(Phone.list[i].Body[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Display) { s += score(Phone.list[i].Display[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Platform) { s += score(Phone.list[i].Platform[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Memory) { s += score(Phone.list[i].Memory[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Camera) { s += score(Phone.list[i].Camera[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Sound) { s += score(Phone.list[i].Sound[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Comms) { s += score(Phone.list[i].Comms[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Features) { s += score(Phone.list[i].Features[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Battery) { s += score(Phone.list[i].Battery[n], query); if(s > 0) x++; }
          for(var n in Phone.list[i].Misc) { s += score(Phone.list[i].Misc[n], query); if(s > 0) x++; }
          s /= x;
        }
        if(s > 0.05) {
          //Announced bonus
          if(+Phone.list[i].Popularity == NaN) s += 0.3;
          else s += +Phone.list[i].Popularity / 200;
        }

        if(s > 0) c.push({index: i, score: s});
      }
      if(query == currentQuery) {
        c.sort(sortCandidates);
        currentQuery = null;
        callback(c);
      }
    });
  }

  Phone.searchPopularPhones = function(query, callback, max) {
    if(!query || !callback) return;
    currentQuery = query;
    setTimeout(function () {
      var c = [], s, o = [], x = 0;
      for(var i=0; i < Phone.popList.length && query == currentQuery; i++) {
        //Get score of phone
        s = 0;
        s += score(Phone.names[Phone.popList[i]], query);
        if(s == 0) {
          for(var n in Phone.list[Phone.popList[i]].Network) { s += score(Phone.list[Phone.popList[i]].Network[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Launch) { s += score(Phone.list[Phone.popList[i]].Launch[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Body) { s += score(Phone.list[Phone.popList[i]].Body[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Display) { s += score(Phone.list[Phone.popList[i]].Display[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Platform) { s += score(Phone.list[Phone.popList[i]].Platform[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Memory) { s += score(Phone.list[Phone.popList[i]].Memory[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Camera) { s += score(Phone.list[Phone.popList[i]].Camera[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Sound) { s += score(Phone.list[Phone.popList[i]].Sound[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Comms) { s += score(Phone.list[Phone.popList[i]].Comms[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Features) { s += score(Phone.list[Phone.popList[i]].Features[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Battery) { s += score(Phone.list[Phone.popList[i]].Battery[n], query); if(s > 0) x++; }
          for(var n in Phone.list[Phone.popList[i]].Misc) { s += score(Phone.list[Phone.popList[i]].Misc[n], query); if(s > 0) x++; }
          s /= x;
        }
        if(s > 0.05){
          //Announced bonus
          if(+Phone.list[Phone.popList[i]].Popularity == NaN) s += 0.3;
          else s += +Phone.list[Phone.popList[i]].Popularity / 200;
        }

        if(s > 0) c.push({index: Phone.popList[i], score: s});
      }
      if(query == currentQuery) {
        c.sort(sortCandidates);
        callback(c);
        currentQuery = null;
      }
    });
  }

  Phone.cancelSearch = function() {
    currentQuery = null;
  }

  return Phone;
})();

function score(string, query) {
  if(string == query) return 1;

  var character, lowerCaseIndex, upperCaseIndex, minIndex, characterScore, distance, tmp;

  var queryLength = query.length;
  var stringLength = string.length;
  var mCharacterScore = 0;
  var startIndex = 0;

  var totalCharacterScore; //= 0
  var indexInQuery; //= 0
  var indexInString; //= 0
  var pindexInString; //= -1
  var nstring; //= string

  //For every starting point, score
  /*
    tmp = Math.min(string.indexOf(query[0].toUpperCase(), startIndex), string.indexOf(query[0].toLowerCase())));
    if(tmp != -1) startIndex = tmp;
    else startIndex = Math.max(string.indexOf(query[0].toUpperCase(), startIndex), string.indexOf(query[0].toLowerCase())));
    while(startIndex != -1) {

  }
  */
  while((startIndex = (tmp = Math.min(string.indexOf(query[0].toUpperCase(), startIndex), string.indexOf(query[0].toLowerCase(), startIndex))) != -1 ? tmp : Math.max(string.indexOf(query[0].toUpperCase(), startIndex), string.indexOf(query[0].toLowerCase(), startIndex))) != -1) {
    totalCharacterScore = indexInQuery = 0;
    nstring = string;
    pindexInString = -1;

    while(indexInQuery < queryLength) {
      //Find query character in string
      character = query[indexInQuery++];
      lowerCaseIndex = nstring.indexOf(character.toLowerCase(), startIndex - (string.length - nstring.length));
      upperCaseIndex = nstring.indexOf(character.toUpperCase(), startIndex - (string.length - nstring.length));
      minIndex = Math.min(lowerCaseIndex, upperCaseIndex);
      if(minIndex == -1) minIndex = Math.max(lowerCaseIndex, upperCaseIndex);
      indexInString = minIndex;
      if(indexInString == -1) {
        totalCharacterScore = 0;
        break;
      }

      characterScore = 0.1;

      //Same case bonus
      if(string[indexInString] == character) characterScore += 0.1;

      if(indexInString + (string.length - nstring.length) == 0 || nstring[indexInString - 1] === '-' || nstring[indexInString - 1] === '_' || nstring[indexInString - 1] === ' ') {
        //Start of word bonus
        characterScore += 0.4;
      }
      if(indexInString + (string.length - nstring.length) == string.length || nstring[indexInString + 1] === '-' || nstring[indexInString + 1] === '_' || nstring[indexInString + 1] === ' ') {
        //End of word bonus
        characterScore += 0.4;
      }

      if(pindexInString != -1 && indexInString + (string.length - nstring.length) - pindexInString != 1) {
        //Length penalty
        characterScore -= 1 - 1/Math.pow(1.5, indexInString + (string.length - nstring.length) - pindexInString - 1);
      }

      //Trim string to after current abbreviation match
      pindexInString = indexInString + (string.length - nstring.length);
      nstring = nstring.substring(indexInString + 1, stringLength);

      totalCharacterScore += characterScore;
    }
    tmp = (totalCharacterScore / queryLength + totalCharacterScore / stringLength) / 2;
    if(tmp > mCharacterScore) mCharacterScore = tmp;
    startIndex++;
  }
  return mCharacterScore;
}

function oldscore(string, query) {
  if(string == query) return 1;

  var character, lowerCaseIndex, upperCaseIndex, minIndex, characterScore, distance;

  var totalCharacterScore = 0;
  var queryLength = query.length;
  var stringLength = string.length;

  var indexInQuery = 0;
  var indexInString = 0;
  var pindexInString = -1;

  while(indexInQuery < queryLength) {
    character = query[indexInQuery++];
    lowerCaseIndex = string.indexOf(character.toLowerCase());
    upperCaseIndex = string.indexOf(character.toUpperCase());
    minIndex = Math.min(lowerCaseIndex, upperCaseIndex);
    if(minIndex == -1) minIndex = Math.max(lowerCaseIndex, upperCaseIndex);
    indexInString = minIndex;
    if(indexInString == -1) return 0;

    characterScore = 0.1;

    //Same case bonus
    if(string[indexInString] === character) characterScore += 0.1;

    if(indexInString === 0) {
      //Start of string bonus
      characterScore += 0.8;
    } else if(string[indexInString - 1] === '-' || string[indexInString - 1] === '_' || string[indexInString - 1] === ' ') {
      //Start of word bonus
      characterScore += 0.7;
    }

    //Trim string to after current abbreviation match
    string = string.substring(indexInString + 1, stringLength);
    pindexInString = indexInString;

    totalCharacterScore += characterScore;
  }
  return (totalCharacterScore / queryLength + totalCharacterScore / stringLength) / 2
}

//------------------Utilities-----------------//

function d(em) { return document.getElementById(em); }
function clear(em) { while(em.firstChild) em.removeChild(em.firstChild); }

//--------------------HTML--------------------//

var searchresults = [], resultsShown = 0;
var cont, img, tit;
var searchname = null, searchval = null;

function populateSearchList(t) {
  var r;
  clear(d('searchresults'));
  searchresults = t;
  resultsShown = 0;
  for(var i=0; i < t.length && i < 20; i++) {
    addResult(new Phone(t[i].index));
    resultsShown++;
  }
}

function addResult(p) {
  cont = document.createElement('div');
  cont.className = 'result';
  cont.onmousedown = function() {
    showPhone(p, Side.r);
    active.right = p;
    searchname = p.name;
    d('search').value = searchname;
  }
  img = document.createElement('img');
  img.setAttribute('src', p.image);
  cont.appendChild(img);
  tit = document.createElement('div');
  tit.className = 'title';
  tit.textContent = p.name;
  cont.appendChild(tit);
  d('searchresults').appendChild(cont);
}

function addOnePlus(p) {
  cont = document.createElement('div');
  cont.className = 'result';
  cont.onclick = function() {
    showPhone(p, Side.l);
    active.left = p;
    d('onpls').textContent = p.name;
  }
  img = document.createElement('img');
  img.setAttribute('src', p.image);
  cont.appendChild(img);
  tit = document.createElement('div');
  tit.className = 'title';
  tit.textContent = p.name;
  cont.appendChild(tit);
  d('onplsresults').appendChild(cont);
}

function tryShowMore() {
  if(searchresults.length - resultsShown > 0) {
    var p = resultsShown;
    for(var i=resultsShown; i < searchresults.length && i - p < 10; i++) {
      addResult(new Phone(searchresults[i].index));
      resultsShown++;
    }
  }
}

var inclick = false;
var active = {
  right: null,
  left: null
}

function ready() {
  Phone.loadPhones();

  d('searchbutton').addEventListener('click', function(e) {
    if(d('search').value != '') {
      if(e.shiftKey) Phone.searchPhones(d('search').value, populateSearchList);
      else Phone.searchPopularPhones(d('search').value, populateSearchList)
    }
  });
  d('search').addEventListener('focus', function() {
    d('search').value = searchval;
    d('searchresults').className = 'show';
  });
  d('search').addEventListener('blur', function() {
    if(!inclick) d('searchresults').className = '';
    if(searchname) d('search').value = searchname;
  });
  d('searchresults').addEventListener('mousedown', function() {
    inclick = true;
  });
  document.addEventListener('mousedown', function(e) {
    var f = false, n = e.target;
    do {
      if(n.id == 'searchresults' || n.id == 'searchbutton' || n.id == 'search') {
        f = true;
        break;
      }
    } while((n = n.parentNode) != null);
    if(f) d('searchresults').className = 'show';
    else d('searchresults').className = '';
  });
  document.addEventListener('mouseup', function() {
    inclick = false;
  });
  d('searchresults').addEventListener('scroll', function() {
    var s = d('searchresults');
    if(s.scrollTop + s.offsetHeight >= s.scrollHeight - 15) tryShowMore();
  });
  d('search').addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'Enter':
        if(e.shiftKey) Phone.searchPhones(d('search').value, populateSearchList);
        else Phone.searchPopularPhones(d('search').value, populateSearchList)
        break;
      case 'Escape':
        if(currentQuery == null) clear(d('searchresults'));
        else currentQuery = null;
        break;
    }
    searchval = d('search').value;
    searchname = null;
  });
  searchval = d('search').value;

  d('dark').addEventListener('click', cancelStart);
  d('fixstartbutton').addEventListener('click', start);
  d('startbutton').addEventListener('click', finishStart);

  createMatter();
}

//------------------Renderer------------------//

var lSide, rSide;
//80 x 106
var lbody, rbody, twall, lwall, bwall, rwall;
var Side = {
  l: 0,
  r: 1
}
var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies, Body = Matter.Body;
var r, l;
var t = 0;
var next = 0;
var ca;
var mul;

var phoneRender = {
  create: function() {
    return {controller: phoneRender };
  },

  world: function(engine) {
    // if(fighting) {
    //   ca = engine.pairs.collisionActive;
    //   for(var i=0; i<ca.length; i++) {
    //     if((ca[i].bodyA == rSide && ca[i].bodyB == lSide) || (ca[i].bodyA == lSide && ca[i].bodyB == rSide)) {
    //       //Phones colliding
    //       showNextSpec();
    //     }
    //   }
    //   if(lbody.position.y < 15 && Math.random() * 20 > 19) {
    //     if(lbody.position.x < 0) {
    //       Body.applyForce(lbody, {x: -width()/2, y: 0}, {x: Math.random() * 50, y: Math.random() * 40});
    //     } else {
    //       Body.applyForce(lbody, {x: width()/2, y: 0}, {x: Math.random() * 50, y: Math.random() * 40});
    //     }
    //   }
    //   if(rbody.position.y < 15 && Math.random() * 20 > 19) {
    //     if(rbody.position.x < 0) {
    //       Body.applyForce(rbody, {x: -width()/2, y: 0}, {x: Math.random() * 50, y: Math.random() * 40});
    //     } else {
    //       Body.applyForce(rbody, {x: width()/2, y: 0}, {x: Math.random() * 50, y: Math.random() * 40});
    //     }
    //   }
    // }
    d('lphone').style.left = toPage(lbody.position.x) + 'px'
    d('lphone').style.bottom = lbody.position.y + 'px'
    d('rphone').style.left = toPage(rbody.position.x) + 'px'
    d('rphone').style.bottom = rbody.position.y + 'px'
    t++
    if(t>20) {
      t = 0;
      showNextSpec();
    }
  }
}

function showNextSpec() {
  if(d('lcont').children[next] != undefined) {
    d('lcont').children[next].className += ' show';
  }
  if(d('rcont').children[next] != undefined) {
    d('rcont').children[next].className += ' show';
  }
  next++;
}

function width() {
  return d('board').offsetWidth;
}
function height() {
  return 450;
}

function toPage(x) {
  return x + d('board').offsetWidth/2;
}
function toBoard(x) {
  return x - d('board').offsetWidth/2;
}

var engine;

function createMatter() {

  engine = Engine.create( {
    render: {
      controller: phoneRender
    }
  });
  //Create Walls
  engine.world.gravity.y = -1;
  twall = Bodies.rectangle(-width()/2 - 100, height(), width() + 200, 100, {isStatic: true});
  bwall = Bodies.rectangle(-width()/2 - 100, -100, width() + 200, 100, {isStatic: true});
  lwall = Bodies.rectangle(-width()/2 - 100, 0, 100, height(), {isStatic: true});
  rwall = Bodies.rectangle(width()/2, 0, 100, height(), {isStatic: true});
  World.add(engine.world, [twall, bwall, rwall, lwall]);

  //Update walls
  window.addEventListener('resize', function() {
    twall.vertices[0].x = -width()/2 - 100;
    twall.vertices[1].x = -width()/2 - 100;
    twall.vertices[2].x = width()/2 + 100;
    twall.vertices[3].x = width()/2 + 100;
    twall.vertices[0].y = height();
    twall.vertices[1].y = height() + 100;
    twall.vertices[2].y = height() + 100;
    twall.vertices[3].y = height();

    bwall.vertices[0].x = -width()/2 - 100;
    bwall.vertices[1].x = -width()/2 - 100;
    bwall.vertices[2].x = width()/2 + 100;
    bwall.vertices[3].x = width()/2 + 100;
    bwall.vertices[0].y = -100;
    bwall.vertices[1].y = 0;
    bwall.vertices[2].y = 0;
    bwall.vertices[3].y = -100;

    lwall.vertices[0].x = -width()/2 - 100;
    lwall.vertices[1].x = -width()/2 - 100;
    lwall.vertices[2].x = -width()/2;
    lwall.vertices[3].x = -width()/2;
    lwall.vertices[0].y = 0;
    lwall.vertices[1].y = height();
    lwall.vertices[2].y = height();
    lwall.vertices[3].y = 0;

    rwall.vertices[0].x = width()/2;
    rwall.vertices[1].x = width()/2;
    rwall.vertices[2].x = width()/2 + 100;
    rwall.vertices[3].x = width()/2 + 100;
    rwall.vertices[0].y = 0;
    rwall.vertices[1].y = height();
    rwall.vertices[2].y = height();
    rwall.vertices[3].y = 0;

    engine.world.bounds.min.x = -width()/2;
    engine.world.bounds.max.x = width()/2;
    engine.world.bounds.min.y = 0;
    engine.world.bounds.max.y = height();
  });
}


function showPhone(model, side) {
  switch(side) {
    case 0:
      lSide = model;
      d('lann').textContent = model.launch.Announced;
      d('lstat').textContent = model.launch.Status;
      d('lname').textContent = model.name;
      lbody = Bodies.rectangle(-width() / 2 + 15, 0, 80, 106);
      World.add(engine.world, [lbody]);
      d('lphone').style.background = 'url(' + model.image + ') top center / 80px 106px';
      l = calculatePoints(lSide);
      break;
    case 1:
      rSide = model;
      d('rann').textContent = model.launch.Announced;
      d('rstat').textContent = model.launch.Status;
      d('rname').textContent = model.name;
      rbody = Bodies.rectangle(width()/2 - 15 - 80, 0, 80, 106)
      World.add(engine.world, [rbody]);
      d('rphone').style.background = 'url(' + model.image + ') top center / 80px 106px';
      r = calculatePoints(rSide);
      break;
  }
  if(rSide && lSide) {
    start();
  }
}

function start() {
  d('dark').className = 'show';
  d('start').className = 'show';
  d('fixstart').className = '';
}

function cancelStart() {
  d('dark').className = '';
  d('start').className = '';
  d('fixstart').className = 'show';
}

function finishStart() {
  d('dark').className = '';
  d('start').className = '';


  var a, b, t, n, f = false;

  a = points(lSide, 'battery');
  b = points(rSide, 'battery');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Battery';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.battery) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.battery[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.battery[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Battery';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.battery) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.battery[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.battery[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'body');
  b = points(rSide, 'body');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Body';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.body) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.body[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.body[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Body';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.body) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.body[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.body[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'camera');
  b = points(rSide, 'camera');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Camera';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.camera) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.camera[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.camera[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Camera';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.camera) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.camera[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.camera[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'comms');
  b = points(rSide, 'comms');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Comms';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.comms) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.comms[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.comms[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Comms';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.comms) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.comms[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.comms[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'display');
  b = points(rSide, 'display');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Display';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.display) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.display[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.display[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Display';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.display) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.display[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.display[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'features');
  b = points(rSide, 'features');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Features';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.features) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.features[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.features[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Features';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.features) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.features[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.features[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'memory');
  b = points(rSide, 'memory');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Memory';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.memory) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.memory[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.memory[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Memory';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.memory) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.memory[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.memory[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'network');
  b = points(rSide, 'network');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Network';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.network) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.network[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.network[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Network';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.network) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.network[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.network[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'platform');
  b = points(rSide, 'platform');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Platform';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in lSide.platform) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+lSide.platform[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += lSide.platform[i];
  }
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Platform';
  t.appendChild(n);
  n = document.createElement('span');
  for(var i in rSide.platform) {
    if(!f) f = true; else n.innerHTML += '<br>';
    if(+rSide.platform[i] == NaN) n.innerHTML += ' -'; else n.innerHTML += i + ': ';
    n.innerHTML += rSide.platform[i];
  }
  t.appendChild(n);
  d('rcont').appendChild(t);

  a = points(lSide, 'popularity');
  b = points(rSide, 'popularity');
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'good'; else if(a + 50 < b) t.className = 'bad';
  n = document.createElement('span');
  n.textContent = 'Popularity';
  t.appendChild(n);
  n = document.createElement('span');
  n.textContent = lSide.popularity + '%';
  t.appendChild(n);
  d('lcont').appendChild(t);
  t = document.createElement('div');
  if(a - 50 > b) t.className = 'bad'; else if(a + 50 < b) t.className = 'good';
  n = document.createElement('span');
  n.textContent = 'Popularity';
  t.appendChild(n);
  n = document.createElement('span');
  n.textContent = rSide.popularity + '%';
  t.appendChild(n);
  d('rcont').appendChild(t);


  fighting = true;
  Engine.run(engine);
}

//----------------Point System----------------//

function c(property) {
  if(property == null) return '';
  return property;
}

function points(p, part) {
  var points = 0;
  switch(part) {
    case 'batttery':
      if(c(p.battery[0]).indexOf('Non-removable') != -1) points -= 50;
      points += parseInt((p.battery[0]).match(/\d+/g)[0]) / 4;
      break;
    case 'body':
      if(c(p.body.SIM).indexOf('Dual') != -1) points += 40;
      break;
    case 'camera':
      points += 5*(parseInt((p.camera.Features).match(/,/g).length) + 1);
      points += 20*parseInt((p.camera.Primary).match(/\d+\s?MP/g)[0]);
      points += 18*parseInt((p.camera.Secondary).match(/\d+\s?MP/g)[0]);
      break;
    case 'comms':
      if(p.comms.Bluetooth) points += 90;
      if(p.comms.GPS) points += 60;
      if(c(p.comms.WLAN).indexOf('dual-band') != -1) points += 60;
      if(c(p.comms.WLAN).indexOf('hotspot') != -1) points += 100;
      break;
    case 'display':
      points += Math.sqrt(Math.sqrt(parseInt(p.display.Resolution.match(/\d+/g)[0]) * parseInt(p.display.Resolution.match(/\d+/g)[1])));
      if(p.display.Type.indexOf('touchscreen') != -1) points += 500;
      break;
    case 'features':
      points += 50*(parseInt((p.features.Sensors).match(/,/g).length) + 1);
      break;
    case 'memory':
      if(c(p.memory['Card Slot']).indexOf('No') != -1) points += 400;
      var a = c(p.memory.Internal).match(/\d+\s?GB,\s?\d+\s?GB RAM/g), b;
      var mram = 0, mmem = 0;
      for(var i=0; i < a.length; i++) {
        b = +a[i].match(/\d+/g)[0];
        if(b > mmem) mmem = b;
        b = +a[i].match(/\d+/g)[1];
        if(b > mram) mram = b;
      }
      points += mram * 250;
      points += mmem * 16;
      break;
    case 'network':
      if(p.network.Technology.indexOf('GSM') != -1) points += 200;
      if(p.network.Technology.indexOf('LTE') != -1) points += 400;
      if(p.network.Technology.indexOf('HSPA') != -1) points += 150;
      break;
    case 'platform':
      a = p.platform.CPU.toLowerCase();
      b = a.match(/(dual|quad|hexa|octa)-core/g);
      var e = 0, m = a.match(/(\d|\.)+\s?ghz/g);
      a = 0;
      for(var i=0; i < b.length; i++) {
        e = i;
        switch(b[i].substr(0, 4)) {
          case 'dual':
            while(!m[e]) e--;
            a += 2* parseFloat(m[e]);
            break;
          case 'quad':
            while(!m[e]) e--;
            a += 4* parseFloat(m[e]);
            break;
          case 'hexa':
            while(!m[e]) e--;
            a += 6* parseFloat(m[e]);
            break;
          case 'octa':
            while(!m[e]) e--;
            a += 8* parseFloat(m[e]);
            break;
        }
      }
      points += a * 100;
      break;
    case 'popularity':
      points += +p.popularity * 10;
      break;
  }
  return points;
}

function calculatePoints(p) {
  var points = 0;
  //Battery
  if(c(p.battery[0]).indexOf('Non-removable') != -1) points -= 50;
  points += parseInt((p.battery[0]).match(/\d+/g)[0]) / 4;
  // console.log('battery: ' + points);
  //Body
  if(c(p.body.SIM).indexOf('Dual') != -1) points += 40;
  // console.log('body: ' + points);
  //Camera
  points += 5*(parseInt((p.camera.Features).match(/,/g).length) + 1);
  points += 20*parseInt((p.camera.Primary).match(/\d+\s?MP/g)[0]);
  points += 18*parseInt((p.camera.Secondary).match(/\d+\s?MP/g)[0]);
  // console.log('camera: ' + points);
  //Comms
  if(p.comms.Bluetooth) points += 90;
  if(p.comms.GPS) points += 60;
  if(c(p.comms.WLAN).indexOf('dual-band') != -1) points += 60;
  if(c(p.comms.WLAN).indexOf('hotspot') != -1) points += 100;
  // console.log('comms: ' + points);
  //Display
  points += Math.sqrt(Math.sqrt(parseInt(p.display.Resolution.match(/\d+/g)[0]) * parseInt(p.display.Resolution.match(/\d+/g)[1])));
  if(p.display.Type.indexOf('touchscreen') != -1) points += 500;
  // console.log('display: ' + points);
  //Features
  points += 50*(parseInt((p.features.Sensors).match(/,/g).length) + 1);
  // console.log('features: ' + points);
  //Memory
  if(c(p.memory['Card Slot']).indexOf('No') != -1) points += 400;
  var a = c(p.memory.Internal).match(/\d+\s?GB,\s?\d+\s?GB RAM/g), b;
  var mram = 0, mmem = 0;
  for(var i=0; i < a.length; i++) {
    b = +a[i].match(/\d+/g)[0];
    if(b > mmem) mmem = b;
    b = +a[i].match(/\d+/g)[1];
    if(b > mram) mram = b;
  }
  points += mram * 250;
  points += mmem * 16;
  // console.log('memory: ' + points);
  //Network
  if(p.network.Technology.indexOf('GSM') != -1) points += 200;
  if(p.network.Technology.indexOf('LTE') != -1) points += 400;
  if(p.network.Technology.indexOf('HSPA') != -1) points += 150;
  // console.log('network: ' + points);
  //Platform
  a = p.platform.CPU.toLowerCase();
  b = a.match(/(dual|quad|hexa|octa)-core/g);
  var e = 0, m = a.match(/(\d|\.)+\s?ghz/g);
  a = 0;
  for(var i=0; i < b.length; i++) {
    e = i;
    switch(b[i].substr(0, 4)) {
      case 'dual':
        while(!m[e]) e--;
        a += 2* parseFloat(m[e]);
        break;
      case 'quad':
        while(!m[e]) e--;
        a += 4* parseFloat(m[e]);
        break;
      case 'hexa':
        while(!m[e]) e--;
        a += 6* parseFloat(m[e]);
        break;
      case 'octa':
        while(!m[e]) e--;
        a += 8* parseFloat(m[e]);
        break;
    }
  }
  points += a * 100;
  // console.log('platform: ' + points);
  //Popularity
  points += +p.popularity * 10;
  // console.log('popularity: ' + points);
  //Misc
  points -= 150*(parseInt(p.misc['Price group'].match(/\d+/g)[0]) | 5);
  return points;
}
