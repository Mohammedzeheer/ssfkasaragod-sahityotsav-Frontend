import React from "react";

const CertificateTemplate = React.forwardRef(({ winnerName, prize, category, item, team }, ref) => (
  <div
    ref={ref}
    style={{
      width: "1123px",
      height: "794px",
      padding: "40px",
      backgroundImage: `url('/certificate.jpg')`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      border: "10px solid #335C67",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "serif",
      position: "relative"
    }}
  >
    <div style={{
      fontFamily: "Arial, serif",
      fontSize: "20px",
      color: "#222",
      textAlign: "left",
      margin: "40px 0",
      lineHeight: 1.6,
      width: "90%",
      maxWidth: "900px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "20px",
      borderRadius: "10px"
    }}>
      This certificate of Achievement is proudly presented to
      <b>
        <span style={{ fontFamily: "Arial Black, Arial, sans-serif", textTransform: "uppercase" }}> {winnerName} </span>
      </b>
      from <b><span style={{ fontFamily: "Arial Black, Arial, sans-serif" }}> {team} </span></b> Sector for securing
      <b><i> {prize} </i></b> place in the
      <b><i> {item} </i></b>
      competition under <b><i> {category} </i></b> category in <b> 32nd Edition Manjeshwar Division Sahityotsav </b> Held at <b>Baliyoor</b> on <b> 21-07-2025 </b>.
    </div>
  </div>
));

export default CertificateTemplate;



// // CertificateTemplate.jsx
// import React from "react";

// const CertificateTemplate = React.forwardRef(({ winnerName, prize, category, item }, ref) => (
//   <div
//     ref={ref}
//     style={{
//       width: "1123px", // A4 width in px at 96dpi (landscape)
//       height: "794px", // A4 height in px at 96dpi (landscape)
//       padding: "40px",
//       background: "#fff",
//       border: "10px solid #335C67",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       fontFamily: "serif",
//       position: "relative"
//     }}
//   >

//     <div style={{
//       fontFamily: "Arial, serif",
//       fontSize: "20px",
//       color: "#222",
//       textAlign: "left",
//       margin: "40px 0",
//       lineHeight: 1.6,
//       width: "90%",
//       maxWidth: "900px"
//     }}>
//       This certificate of Achievement is proudly presented to
//       <b> <span style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>{winnerName}</span> </b>
//       from <b><span style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>{"Manjeshwar"}</span></b> Sector for securing
//       <b><i> {prize} </i></b>
//       <b><i> {item} </i></b>
//       competition under <b><i>{category}</i></b> category in
//       <b>32nd Edition Manjeshwar Division Sahityotsav</b>
//       Held at <b>Baliyoor</b> on <b>{"21-07-2025"}</b>.
//     </div>
//   </div>
// ));

// export default CertificateTemplate;
