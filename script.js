// theme change 
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }

  function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "" : "";
   
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
  }

  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
  
  
 
  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
 
  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
 
  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  }); 


  document.getElementsByClassName('ff-success').innerHTML = '';
  var h1 = document.createElement('h1');
h1.innerHTML = "hello world!";
document.getElementsByClassName('ff-success').appendChild(h1);








		
		$('.slider').each(function() {
		  var $this = $(this);
		  var $group = $this.find('.slide_group');
		  var $slides = $this.find('.slide');
		  var bulletArray = [];
		  var currentIndex = 0;
		  var timeout;

		  function move(newIndex) {
			var animateLeft, slideLeft;

			advance();

			if ($group.is(':animated') || currentIndex === newIndex) {
			  return;
			}

			bulletArray[currentIndex].removeClass('active');
			bulletArray[newIndex].addClass('active');

			if (newIndex > currentIndex) {
			  slideLeft = '100%';
			  animateLeft = '-100%';
			} else {
			  slideLeft = '-100%';
			  animateLeft = '100%';
			}

			$slides.eq(newIndex).css({
			  display: 'block',
			  left: slideLeft
			});
			$group.animate({
			  left: animateLeft
			}, function() {
			  $slides.eq(currentIndex).css({
				display: 'none'
			  });
			  $slides.eq(newIndex).css({
				left: 0
			  });
			  $group.css({
				left: 0
			  });
			  currentIndex = newIndex;
			});
		  }

		  function advance() {
			clearTimeout(timeout);
			timeout = setTimeout(function() {
			  if (currentIndex < ($slides.length - 1)) {
				move(currentIndex + 1);
			  } else {
				move(0);
			  }
			}, 4000);
		  }

		  $('.next_btn').on('click', function() {
			if (currentIndex < ($slides.length - 1)) {
			  move(currentIndex + 1);
			} else {
			  move(0);
			}
		  });

		  $('.previous_btn').on('click', function() {
			if (currentIndex !== 0) {
			  move(currentIndex - 1);
			} else {
			  move(3);
			}
		  });

		  $.each($slides, function(index) {
			var $button = $('<a class="slide_btn">&bull;</a>');

			if (index === currentIndex) {
			  $button.addClass('active');
			}
			$button.on('click', function() {
			  move(index);
			}).appendTo('.slide_buttons');
			bulletArray.push($button);
		  });

		  advance();
		});
