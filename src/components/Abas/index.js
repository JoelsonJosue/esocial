/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { RowStyle } from './styles';
import { Formik, Form } from 'formik';
import schema from './schema'
import Fase1 from './Fase1/index'
import api from '../../services/api'

export default function Abas() {

    const [key, setKey] = useState('fase-1');
    const [log, setLog] = useState('');

    async function onSubmit(values, actions) {

      let appendLog = '<p>Processando...</p>';

      setLog(appendLog);

      const evento = values.evento;

      if(values.tipo === '1'){

        const json = JSON.stringify({ database: values.database, 
          entidade: values.entidade, 
          evento: values.evento });
  
        const response = await api.post("esocial/eventos", json, {
        headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
  
          if(response.data[evento]){
  
            for (var chave1 in response.data[evento]){
  
                let i = 1;
                for (var chave2 in response.data[evento][chave1]){
                  if(response.data[evento][chave1][chave2] !== null){
  
                    if(chave2 === 'processamento'){
                      appendLog += '<p style="color: blue; font-weight: bold;">---------- Críticas-> (Evento: '+ evento +') ----------</p>';
                      appendLog += '<p style="color: green; font-weight: bold;">'+ response.data[evento][chave1][chave2] +'</p>';
                    }else{
  
                      if(i === 1) {
                        appendLog += '<p style="color: blue; font-weight: bold;">---------- Críticas-> (Evento: '+ evento +') ----------</p>';
                      }
                      appendLog += '<p style="color: red">' + response.data[evento][chave1][chave2] + '</p>';
                      i++;
  
                    }
  
                  }else{
                    appendLog += '<p style="color: blue; font-weight: bold;">---------- Críticas-> (Evento: '+ evento +') ----------</p>';
                    appendLog += '<p style="color: green; font-weight: bold;">Todos os eventos '+ evento +' foram salvos com sucesso!</p>';  
                  }
                }
              
            }
            appendLog += '<p style="color: blue; font-weight: bold;">---------- FIM  ----------</p>';
            
  
          }else{
            appendLog += '<p style="color: red">' + response.data + '</p>';
            setLog(appendLog);
          }
  
        })
        .catch((err) => {
            appendLog += '<p>Ocorreu um erro de conexão: ' + err + '</p>';
            setLog(appendLog);
          //console.error("Ocorreu um erro de conexão " + err);
        });

      }else{

        const json = JSON.stringify({ database: values.database, 
          nrinsc: values.nrinsc, 
          evento: values.evento });
        alert(json);
      }

      appendLog += '<p>Concluído!</p>';
      setLog(appendLog);

      //console.log(log);                            
      /*let json = '';
      json += '<p>teste1</p>';
      json += '<p>teste2</p>';
      json += '<p>teste3</p>';*/
      //setLog(json);
    }

    return (
          <Formik
            validationSchema={schema} 
            initialValues={{
              tipo: '1',
              entidade: '',
              codrubr: '',
              codlotacao: '',
              tpproc: '',
              nrproc: '',
              nrinsc: '',
              evento: 'default',
              database: '',
            }}
            validateOnMount
            onSubmit={onSubmit}
            /*render={({ values, isValid }) => (
              <>
                <p>teste</p>
              </>
            )}*/
          >
            {({ values, isValid }) => (
              <Form>
                {JSON.stringify(values)}
                <RowStyle>
                  <Tabs
                    id="abas"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="fase-1" title="Fase 1">
                        <Fase1 values={values} isValid={isValid} Log={log} />
                    </Tab>
                    <Tab eventKey="fase-2" title="Fase 2">
                      <p>Fase 2</p>
                    </Tab>
                    <Tab eventKey="fase-3" title="Fase 3">
                      <p>Fase 3</p>
                    </Tab>
                  </Tabs>
                </RowStyle>
              </Form>
            )}
          </Formik>
    )
}