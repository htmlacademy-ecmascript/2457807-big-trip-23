import AbstractView from '../framework/view/abstract-view.js';

const сreateListEmptyViewTemplate = (typeMessage) =>`<section class="trip-events">
<h2 class="visually-hidden">Trip events</h2>
<div class="cats">
	<div class="cat cat--1">
		<img src="https://cdn.dribbble.com/users/218750/screenshots/2090988/sleeping_beauty.gif" alt="">
	</div>
	<div class="cat cat--2">
		<img src="https://cdn.dribbble.com/users/6191/screenshots/1192777/catpurr.gif" alt="">
	</div>
	<div class="cat cat--3">
		<img src="https://cdn.dribbble.com/users/6191/screenshots/2211315/meal.gif" alt="">
	</div>
  <div class="trip-events__msg loader">${typeMessage}</div>
	<div class="cat cat--4">
		<img src="https://cdn.dribbble.com/users/6191/screenshots/1189704/walkingcat.gif" alt="">
	</div>
	<div class="cat cat--5">
		<img src="https://cdn.dribbble.com/users/6191/screenshots/3661586/cat_sleep_dribbble.gif" alt="">
	</div>
  <div class="cat cat--1">
  <img src="https://media1.tenor.com/m/DqfRST6iWKwAAAAC/mochi-mochimochi.gif" alt="">
  </div>
</div>
<style>
.loader {
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-family: helvetica, arial, sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  color: #ce4233;
  letter-spacing: 0.2em;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  }
  .loader::before,
  .loader::after {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #ce4233;
  position: absolute;
  animation: load 0.9s infinite alternate ease-in-out;
  }
  .loader::before {
  top: 0;
  }
  .loader::after {
  bottom: 0;
  }

  @keyframes load {
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 235px;
    height: 30px;
    width: 15px;
  }
</style>
<style>
$first: 	#abe7db;
$second: 	#f67c61;
$third: 	#fff9e8;
$forth: 	#58a5a3;
$fifth: 	#172535;

$list: ('1': $first, '2': $second,'3': $third,'4': $forth,'5': $fifth);

@mixin grid($column-start, $column-end, $row-start: $column-start, $row-end: $column-end) {
	grid-column-start: $column-start;
	grid-column-end: $column-end;
	grid-row-start: $row-start;
	grid-row-end: $row-end;
}

body, html {
	margin: 0;
	padding: 0;
}

.cats {
	display: grid;
	grid-auto-flow: dense;
	overflow: hidden;
}
@media screen and (min-width: 45em) {
	.cats {
		height: 100vh;
		grid-template-columns: 29% 29% 29%;
		grid-template-rows: 60% 16% 34%;
	}
}
@media screen and (max-width: 45em) and (min-width: 25em) {
	.cats {
		grid-template-columns: repeat(2, (100vw / 2));
		grid-template-rows: repeat(3, 1fr);
	}
}
@media screen and (max-width: 25em) {
	.cats {
		grid-template-columns: 100vw;
		grid-template-rows: repeat(5, 1fr);
	}
}

.cat {
	img {width:100%;}
	@each $i in map-keys($list) {
		&.cat--#{$i} {
			background-color: map-get($list, $i);
		}
	}
	&.cat--1 {
		@include grid(1, 3);
	}
	&.cat--2 {
		@include grid(1, 2, 3, 4);
	}
	&.cat--3 {
		@include grid(2, 3, 3, 4);
	}
	&.cat--4 {
		@include grid(3, 4, 1, 2);
	}
	&.cat--5 {
		@include grid(3, 4, 2, 4);
	}
	@media screen and (max-width: 45em) and (min-width: 25em) {
		@for $j from 4 through 5 {
			&.cat--#{$j} {
				@include grid($j - 3, $j - 2, 4, 5);
			}
		}
	}
	@media screen and (max-width: 25em) {
		@for $k from 1 through 5 {
			&.cat--#{$k} {
				@include grid(1, 2, $k, $k + 1);
			}
		}
	}
}</style>
</section>`;

export default class LoadingView extends AbstractView{
  #typeMessage = null;
  constructor(typeMessage){
    super();
    this.#typeMessage = typeMessage;
  }

  get template() {
    return сreateListEmptyViewTemplate(this.#typeMessage);
  }
}
