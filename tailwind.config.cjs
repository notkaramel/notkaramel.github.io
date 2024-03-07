/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        karamel: {
          'primary': 'hsla(132, 83%, 64%, 1)',
          'secondary': 'hsla(189, 83%, 64%, 1)',
          'accent': 'hsla(214, 48%, 48%, 1)',
          'neutral': 'hsla(151, 48%, 67%, 0.81)',
          'info': 'hsla(204, 86%, 53%, 1)',
          'base-100': 'hsla(214, 36%, 31%, 1)',
        },
      },
    ]
  }
}
