import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"

import "./layout.css"

/* ページ表示時にアイコンが拡大表示されるのを防ぐ。
FontAwesomeのcssを先に読み込むことで回避する。 */
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export default ( {children} ) => (
  <div>
    <Header />
      {children}
    <Footer />
  </div>
)