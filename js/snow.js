document.addEventListener("DOMContentLoaded", function () {
  var _0x16d54b = document.createElement("script");
  _0x16d54b.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
  _0x16d54b.onload = function () {
    particlesJS("snow", {
      'particles': {
        'number': {
          'value': 0x28,
          'density': {
            'enable': true,
            'value_area': 0x320
          }
        },
        'color': {
          'value': "#ffffff"
        },
        'opacity': {
          'value': 0.7,
          'random': false,
          'anim': {
            'enable': false
          }
        },
        'size': {
          'value': 1.3,
          'random': true,
          'anim': {
            'enable': false
          }
        },
        'line_linked': {
          'enable': false
        },
        'move': {
          'enable': true,
          'speed': 0x1,
          'direction': "bottom",
          'random': true,
          'straight': false,
          'out_mode': "out",
          'bounce': false,
          'attract': {
            'enable': true,
            'rotateX': 0x12c,
            'rotateY': 0x4b0
          }
        }
      },
      'interactivity': {
        'events': {
          'onhover': {
            'enable': false
          },
          'onclick': {
            'enable': false
          },
          'resize': false
        }
      },
      'retina_detect': true
    });
  };
  document.head.append(_0x16d54b);
});