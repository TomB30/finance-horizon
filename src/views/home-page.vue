<template>
  <section class="home-page">
    <section class="hero">
      <h2 class="text-teal-7">ברוכים הבאים ל-FinanceWise</h2>
      <p>
        הפתרון הכולל שלך לניהול כל הצרכים הפיננסיים שלך. גלה את הכלים והשירותים שלנו שיעזרו לך לתכנן
        את עתידך הפיננסי.
      </p>
      <div class="hero-buttons">
        <q-btn color="primary" class="q-ml-md">התחל עכשיו</q-btn>
        <q-btn color="primary" flat>למד עוד</q-btn>
      </div>
    </section>

    <section class="tools-section">
      <h3>כלים לתכנון פרישה</h3>
      <div class="tools-grid">
        <div class="tool-card bg-grey-2">
          <img src="../assets/imgs/retirement-calculator.jpg" alt="Retirement Calculator" />
          <p>
            תכנן את הפרישה שלך עם המחשבון הקל לשימוש שלנו. הערך את החסכונות שלך וקבע מטרות לאבטחת
            עתידך.
          </p>
          <q-btn color="primary">נסה מחשבון</q-btn>
        </div>
        <div class="tool-card bg-grey-2">
          <img
            class="explore-retirement-options"
            src="../assets/imgs/explore-retirement-options.jpg"
            alt="Retirement Options"
          />
          <p>
            חקור אפשרויות השקעה מגוונות כדי למקסם את חסכונות הפרישה שלך ולהשיג את המטרות הפיננסיות
            שלך.
          </p>
          <q-btn color="primary">חקור אפשרויות</q-btn>
        </div>
      </div>
    </section>

    <section class="tools-section">
      <h3>כלי השקעות</h3>
      <div class="tools-grid">
        <div class="tool-card bg-grey-2">
          <img src="../assets/imgs/investment-tools.jpeg" alt="Investment Analysis" />
          <p>גש לכלים המקיפים שלנו כדי לנתח מגמות שוק ולקבל החלטות השקעה מושכלות.</p>
          <q-btn color="primary">נתח עכשיו</q-btn>
        </div>
        <div class="tool-card bg-grey-2">
          <img src="../assets/imgs/explore-investment-options.jpeg" alt="Diversify Portfolio" />
          <p>גוון את התיק שלך עם הכלים והמשאבים המומחים שלנו לצמיחה פיננסית אופטימלית.</p>
          <q-btn color="primary">גוון תיק השקעות</q-btn>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'home-page',
  components: {},
  emits: {},
  props: {},
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {}
})
</script>

<style lang="scss" scoped>
/* Global Styles */
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
//   font-family: Arial, sans-serif;
// }

// body {
//   background-color: #f9f9f9;
//   color: #333;
// }

/* Header */
// header {
//   background-color: white;
//   padding: 20px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// }

// .container {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
// }

// .logo h1 {
//   font-size: 24px;
// }

// nav ul {
//   display: flex;
//   list-style: none;
// }

// nav ul li {
//   margin-right: 20px;
// }

// nav ul li a {
//   text-decoration: none;
//   color: #333;
//   font-size: 18px;
// }

// .auth-buttons button {
//   margin-left: 10px;
//   padding: 10px 15px;
//   border: none;
//   cursor: pointer;
// }

// .login-btn {
//   background-color: white;
//   border: 1px solid #333;
// }

// .signup-btn {
//   background-color: #000;
//   color: white;
// }

/* Hero Section */
.hero {
  text-align: center;
  padding: 80px 20px;
}

.hero h2 {
  font-size: 32px;
}

.hero p {
  margin: 20px 0;
  font-size: 18px;
}

.hero-buttons {
  margin-top: 20px;
}

// .hero-buttons .primary-btn,
// .hero-buttons .secondary-btn {
//   padding: 10px 20px;
//   border: none;
//   cursor: pointer;
//   margin: 0 10px;
// }

// .primary-btn {
//   background-color: #000;
//   color: white;
// }

// .secondary-btn {
//   background-color: white;
//   border: 1px solid #000;
// }

/* Tools Section */
.tools-section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

.tools-section h3 {
  font-size: 28px;
  margin-bottom: 20px;
}

.tools-grid {
  display: flex;
  justify-content: space-between;
}

.tool-card {
  text-align: center;
  width: 48%;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding-bottom: 16px;
}

.tool-card img {
  width: 100%;
  height: 200px;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
  margin-bottom: 20px;
}

.tool-card p {
  padding: 0 16px;
  font-size: 16px;
  margin-bottom: 20px;
}

// .tool-card button {
//   padding: 10px 20px;
//   background-color: #000;
//   color: white;
//   border: none;
//   cursor: pointer;
// }
</style>
