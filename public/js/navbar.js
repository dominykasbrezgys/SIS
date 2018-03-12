
// $('.navbar li').click( function() {
// 	console.log("In");
//     $('.navbar li.active').removeClass('active');
//     var $this = $(this);
//     if (!$this.hasClass('active')) {
//         $this.addClass('active');
//     }
// });

var path = window.location.pathname; 


const navbar = Array.from(document.querySelectorAll('.nav>ul>li'));
console.log('Get first: ', navbar[0].textContent);

// var x = document.getElementsByClassName("nav").getElementsByTagName("li");

// console.log(x[0]);

