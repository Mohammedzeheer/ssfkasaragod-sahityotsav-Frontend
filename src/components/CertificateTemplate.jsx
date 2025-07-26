import React from "react";

const CertificateTemplate = React.forwardRef(
  ({ winnerName, prize, category, item, team }, ref) => (
    <div
      ref={ref}
      className="w-[1123px] h-[794px] p-10 border-[10px] border-[#335C67] flex flex-col  font-serif relative bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('/certificate.jpg')`,
      }}
    >
      <div className="font-sans text-[20px] text-[#222] text-left mt-52 ml-16  leading-relaxed w-[90%] max-w-[900px] bg-[#fdfff4] p-5 rounded-[10px]">
        This is to certify that{" "}
        <b>
          <span className="poppins-bold font-sans text-blue">{winnerName}</span>
        </b>{" "}from{" "}{team} {" "} Division has secured <b>{prize}</b> Place in the{" "}
          {category}{" "}{item}{" "}
          in the event held in connection with the
          SSF District Sahityotsav, conducted at Badiadka
          from July 20 to 27, 2025.
      </div>
    </div>
  )
);

export default CertificateTemplate;




// import React from "react";

// const CertificateTemplate = React.forwardRef(({ winnerName, prize, category, item, team }, ref) => (
//   <div
//     ref={ref}
//     style={{
//       width: "1123px",
//       height: "794px",
//       padding: "40px",
//       backgroundImage: `url('/certificate.jpg')`,
//       backgroundSize: "cover",
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
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
//       maxWidth: "900px",
//       backgroundColor: "#fdfff4",
//       padding: "20px",
//       borderRadius: "10px"
//     }}>
//       This certificate of Achievement is proudly presented to
//       <b>
//         <span style={{ fontFamily: "Arial Black, Arial, sans-serif", textTransform: "uppercase" }}> {winnerName} </span>
//       </b>
//       from <b><span style={{ fontFamily: "Arial Black, Arial, sans-serif" }}> {team} </span></b> Sector for securing
//       <b><i> {prize} </i></b> place in the
//       <b><i> {item} </i></b>
//       competition under <b><i> {category} </i></b> category in <b> 32nd Edition Manjeshwar Division Sahityotsav </b> Held at <b>Baliyoor</b> on <b> 21-07-2025 </b>.
//     </div>
//   </div>
// ));

// export default CertificateTemplate;



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
