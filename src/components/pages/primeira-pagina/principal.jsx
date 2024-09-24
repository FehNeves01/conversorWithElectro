import React, { useEffect, useState } from "react";
import {
  Container,
  LabelArquivo,
  LabelQuantidadeRows,
  LabelValueRows,
} from "./styles.jsx";
import { Col, Row } from "react-bootstrap";
import ButtonUpload from "./components/Button-upload.jsx";
import { Button } from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
export default function Principal() {
  //   console.log("Componente Principal renderizado");
  const [file, setFile] = useState([]);
  const [fileContent, setFileContent] = useState([]);
  const [rowConvertida, setRowConvertida] = useState(0);

  useEffect(() => {
    if (file) {
      readFileContent(file[0]).then((content) => {
        const lines = rowsToArray(content);
        setFileContent(lines); // Agora temos as linhas do arquivo no estado
      });
    }
    return () => {};
  }, [file]);

  function converter() {
    const linhasConvertidas = [];
    linhasConvertidas.push("veiculo;horatransacao;numerocartao;linha");
    fileContent.map((row, index) => {
      const veiculo = row.substring(79, 89);
      const horatransacao = row.substring(11, 19);
      const numerocartao = row.substring(20, 30);
      const linha = row.substring(68, 78);

      linhasConvertidas.push(
        veiculo.trim() +
          ";" +
          horatransacao.trim() +
          ";" +
          numerocartao.trim() +
          ";" +
          linha.trim()
      );
      setRowConvertida(index);
    });

    const blob = new Blob([linhasConvertidas.join("\n")], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "linhasConvertidas.bil"; // Nome do arquivo
    link.click(); // Simula o clique para download
    console.log(linhasConvertidas);
  }

  return (
    <Container>
      <Row className="d-flex align-items-around  h-100">
        <Row
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Col xs={12} style={{}}>
            <ButtonUpload setFile={setFile} />
            <LabelArquivo>{file[0]?.name ? file[0]?.name : ""}</LabelArquivo>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <LabelQuantidadeRows>
              {fileContent.length > 0 && "Total de linhas no arquivo: "}
            </LabelQuantidadeRows>
            <LabelValueRows>
              {fileContent.length > 0 && fileContent.length}
            </LabelValueRows>
          </Col>
        </Row>
        <Row>
          <Col>{rowConvertida}</Col>
        </Row>

        <Row className="d-flex align-content-end ">
          <Col className="d-flex justify-content-end">
            <Button
              variant="contained"
              color="success"
              disabled={isDisabled(fileContent)}
              onClick={() => converter()}
            >
              <ClassIcon />
              Converter
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
function rowsToArray(fileContent) {
  const array = [];
  const lines = fileContent.split(/\r?\n/);

  lines.forEach((line) => {
    array.push(line);
  });
  // debugger;
  return array;
}

function isDisabled(rows) {
  if (rows.length > 0) {
    return false;
  }
  return true;
}
