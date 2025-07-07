/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // ... (path file Anda)
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'), // Tambahkan baris ini
    ],
}