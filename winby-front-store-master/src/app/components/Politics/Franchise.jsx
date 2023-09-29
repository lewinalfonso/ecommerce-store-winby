import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styled, { css } from 'styled-components';
import fondoTextura from '../../../assets/icons/textura.svg';
import logoWinby from '../../../assets/icons/logoWinby.svg';

export default ({ state }) => (
    <Box>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
            <LOGOP />
            <H3>CONTRATO DE LICENCIA DE USO DE SOFTWARE.</H3>
            <Textarea>
                                Entre los suscritos, de una parte{' '}
                <strong>ANGELO GIOHAN DEL CASTILLO MIRANDA</strong> varón, mayor de edad
        y vecino de la ciudad de Barranquilla Colombia, identificado con cédula
        de ciudadanía número <strong>1.007.667.865,</strong> quien obra en
        nombre y representación de <strong>WINBY BUSINESS GROUP S.A.S.</strong>,
        sociedad constituida, con el lleno de los requisitos legales, por
        documento privado del 07 de septiembre de 2020, inscrito en la Cámara de
        Comercio de Barranquilla bajo el número 387.197 del libro IX,
        identificada con el <strong>NIT 901.409.399 - 9;</strong> quién para los
        efectos del presente contrato, en adelante se denominará{' '}
                <strong>EL LICENCIANTE,</strong> y por la otra{' '}
                <strong>
                    {state?.values?.up_name} {state?.values?.up_last}
                </strong>
        , mayor de edad y vecino de la ciudad de {state?.values?.m_name}{' '}
                {state?.values?.d_name} {state?.values?.c_name}, identificado con
        documento de identidad número{' '}
                <strong>{state?.values?.up_ideNum}</strong>; quien para los efectos del
        presente contrato, en adelante se denominará{' '}
                <strong>EL LICENCIATARIO,</strong> hemos convenido celebrar el presente{' '}
                <strong>CONTRATO DE LICENCIA DE USO DE SOFTWARE,</strong> teniendo en
        cuenta las siguientes, clausulas:
                <br />
                <br />
                <strong>CONTRATO DE LICENCIA DE USO DE SOFTWARE.</strong>
                <br />
                <strong>A. SOFTWARE:</strong> Es el programa de computador o soporte
        lógico desarrollado por <strong>EL LICENCIANTE</strong>, denominado{' '}
                <strong>WINBY,</strong> cuyo uso se concede en virtud del presente
        contrato.
                <br />
                <strong>B. LICENCIANTE:</strong> Es el dueño de la propiedad intelectual
        y derechos patrimoniales del <strong>SOFTWARE WINBY</strong>, paralo
        previsto en el presente contrato{' '}
                <strong>WINBY BUSINESS GROUP S.A.S.</strong>
                <br />
                <strong>C. LICENCIATARIO:</strong> Es la persona que por medio de este
        documento adquiere la licencia del <strong>SOFTWARE WINBY.</strong>
                <br />
                <strong>D. USUARIOS:</strong> Se refiere a la combinación de nombre de
        usuario y contraseña utilizada para acceder al{' '}
                <strong>SOFTWARE WINBY.</strong> Se permite solo un usuario por
        licencia.
                <br />
                <strong>E. LICENCIA DE USO:</strong> Es la autorización de uso que por
        medio del presente contrato da{' '}
                <strong>EL LICENCIANTE a EL LICENCIATARIO.</strong> Constituye el límite
        y alcance del uso que puede hacer <strong>EL LICENCIATARIO</strong> del{' '}
                <strong>SOFTWARE WINBY.</strong>
                <br />
                <strong>F. MODALIDAD DE LICENCIA:</strong> La licencia de uso que por
        este documento se otorga, es temporal, no exclusiva, es decir, que se
        adquiere mediante cánones sucesivos que le dan a{' '}
                <strong>SOFTWARE WINBY</strong> por tiempo limitado conforme a lo
        regulado en este contrato.
                <br />
                <br />
                <strong>CLÁUSULA SEGUNDA. OBJETO:</strong> Mediante el presente contrato{' '}
                <strong>EL LICENCIANTE</strong> otorga una{' '}
                <strong>LICENCIA DE USO</strong> del <strong>SOFTWARE WINBY:</strong> 1)
        de acuerdo a la <strong>MODALIDAD DE LICENCIA TEMPORAL,</strong> 2)
        durante el período de vigencia de la licencia, y 3) en la forma prevista
        en este contrato.
                <br />
                <br />
                <strong>CLAUSULA TERCERA. CARÁCTERISTICAS DEL SOFTWARE:</strong> El
        programa que se entrega a <strong>EL LICENCIATARIO</strong> a título de
        LICENCIA comprende las siguientes características generales.{' '}
                <strong>El SOFTWARE WINBY</strong> es una multiplataforma de comercio
        electrónico que funge como herramienta para la reactivación económica,
        tanto de sociedades comerciales y personas naturales comerciantes, como
        de las personas que quieran generar ingresos adicionales resultantes de
        la venta de productos y servicios. Consta de cuatro módulos, dos de los
        cuales podrán ser usados por <strong>EL LICENCIATARIO,</strong> a saber:{' '}
                <strong>Modulo de proveedores:</strong> En este módulo, con fines de
        comercialización, <strong>EL LICENCIATARIO</strong> podrá subir sus
        productos y servicios a <strong>EL SOFTWARE WINBY,</strong> administrar
        las ventas y distribución de productos y servicios, así como administrar
        sus utilidades. <strong>Módulo de Winber:</strong> En este módulo,{' '}
                <strong>EL LICENCIATARIO</strong> podrá comercializar los productos y
        servicios propios, y de otros <strong>LICENCIATARIOS,</strong>{' '}
        administrar las ventas y distribución de productos y servicios, así como
        administrar sus utilidades.{' '}
                <strong>PARAGARAFO: EL LICENCIATARIO</strong> declara conocer y aceptar
        los contenidos y funciones de <strong>EL SOFTWARE WINBY.</strong>
                <br />
                <br />
                <strong>CLÁUSULA CUARTA. DERECHOS SOBRE EL SOFTWARE WINBY:</strong> Los
        derechos de propiedad intelectual o industrial, derechos de autor y
        demás derechos de propiedad, sobre <strong>EL SOFTWARE WINBY</strong>{' '}
        son de propiedad de <strong>EL LICENCIANTE. EL LICENCIANTE</strong>{' '}
        permite el uso del <strong>SOFTWARE WINBY</strong> únicamente de acuerdo
        con las condiciones del presente contrato.{' '}
                <strong>EL LICENCIANTE</strong> se reserva todos los derechos no
        otorgados específicamente en virtud de la{' '}
                <strong>LICENCIA DE USO.</strong>
                <br />
                <br />
                <strong>
                                        CLÁUSULA QUINTA. CONDICIONES DE USO. EL LICENCIATARIO
                </strong>{' '}
        se compromete a: 1) No explotar comercialmente el software. 2) No
        permitir el manejo técnico inverso, el desmontaje o descompilado del
        programa. 3) A usar EL SOFTWARE WINBY solamente para los usos
        autorizados. 4) Utilizar el software exclusivamente en los computadores
        y dispositivos móviles de su propiedad. 5) No realizar modificaciones al
        software. 6) No realizar nuevos trabajos construidos con base en el
        software objeto de licencia (obras derivadas). 7) Adquirir el hardware
        necesario para el correcto funcionamiento del mismo. 8) No sub licenciar
        el uso del software objeto del presente contrato. Por su parte{' '}
                <strong>EL LICENCIANTE</strong> autoriza a: 1) Usar{' '}
                <strong>EL SOFTWARE WINBY</strong> como herramienta de comercialización
        de sus productos y servicios. 2) Utilizar la pasarela de pagos de la
        plataforma para recibir los pagos de los productos y servicios
        comercializados. 3) Cargar sus productos y/o servicios para
        comercializarlos a través de EL <strong>SOFTWARE WINBY</strong> 4)
        Elegir los productos y servicios de otros LICENCIATARIOS y que{' '}
                <strong>EL SOFTWARE WINBY</strong> pone a su disposición para mercadear.
        PARAGRAFO: EL LICENCIATARIO no está autorizado a realizar copias de los{' '}
                <strong>PPROCEDIMIENTOS OPERATIVOS ESTÁNDAR</strong> ni de los demás
        materiales impresos que acompañen <strong>EL SOFTWARE WINBY.</strong> La
        estructura, organización y código fuente del{' '}
                <strong>SOFTWARE WINBY</strong> son secretos comerciales e información
        confidencial valiosa de{' '}
                <strong>EL LICENCIANTE. EL SOFTWARE WINBY</strong> está protegido por la
        ley, incluyendo entre otras, las leyes de derechos de autor de la
        República de Colombia y de otros países y por las normas previstas en
        los tratados internacionales de propiedad intelectual. Este contrato no
        concede a <strong>EL LICENCIATARIO</strong> ningún derecho sobre la
        propiedad intelectual del <strong>SOFTWARE WINBY,</strong> y todos los
        derechos que no sean otorgados expresamente en este documento se los
        reserva <strong>EL LICENCIANTE.</strong>
                <br />
                <br />
                <strong>CLÁUSULA SEXTA. LICENCIA TEMPORAL:</strong> La licencia de uso
        que por este instrumento adquiere <strong>EL LICENCIATARIO</strong> es
        temporal, es decir que adquiere el derecho a usar{' '}
                <strong>EL SOFTWARE WINBY</strong> durante un tiempo de cinco (5) años,
        conforme a los cánones que vaya pagando mensualmente. Con todo, el
        derecho de uso queda condicionado al pago de los cánones mensuales
        pactados. <strong>EL LICENCIANTE</strong> prestará a{' '}
                <strong>EL LICENCIATARIO</strong> el servicio de soporte en los términos
        establecidos en este contrato, mientras se encuentre vigente la{' '}
                <strong>LICENCIA TEMPORAL</strong> y <strong>EL LICENCIATARIO.</strong>{' '}
        se encuentre al día en el pago de los cánones pactados.{' '}
                <strong>PARÁGRAFO PRIMERO: EL LICENCIATARIO</strong> podrá disponer del
        uso de <strong>EL SOFTWARE WINBY</strong> dentro de las 48 horas
        siguientes a la fecha de pago del primer canon de que trata la cláusula
        6 de este contrato. <strong>PARAGRAFO SEGUNDO:</strong> En los términos
        de este contrato <strong>EL LICENCIATARIO</strong> podrá acceder al uso
        de actualizaciones y/o nuevas versiones pagando el incremento del precio
        mensual de la <strong>LICENCIA TEMPORAL</strong> conforme al precio
        establecido para la versión del <strong>SOFTWARE WINBY</strong> a la que
        se pretenda acceder.
                <br />
                <br />
                <strong>CLÁUSULA SÉPTIMA. PRECIO DE LA LICENCIA TEMPORAL:</strong>{' '}
        Durante la vigencia del presente contrato,{' '}
                <strong>EL LICENCIATARIO</strong> se obliga para con{' '}
                <strong>EL LICENCIANTE</strong> al pago sucesivo mensual, contado a
        partir de la fecha del presente documento, de manera anticipada, dentro
        de los tres primeros días hábiles de cada mes, de la suma de{' '}
                <strong>CIEN MIL PESOS ($100.000).</strong> En el evento de
        incumplimiento de cualquiera de los pagos, la{' '}
                <strong>LICENCIA TEMPORAL</strong> se suspenderá inmediatamente hasta
        tanto se verifique el pago. Pasados tres (3) meses sin verificarse el
        pago, la <strong>LICENCIA TEMPORAL</strong> se terminará y{' '}
                <strong>EL LICENCIATARIO</strong> perderá inmediatamente el derecho de
        uso del <strong>SOFTWARE WINBY. EL LICENCIANTE</strong> podrá modificar
        libremente el precio mensual de la <strong>LICENCIA TEMPORAL</strong>{' '}
        dando aviso por escrito a <strong>EL LICENCIATARIO</strong> con un (1)
        mes de anterioridad a la entrada en vigencia del nuevo precio, tiempo en
        el cual <strong>EL LICENCIATARIO</strong> podrá decidir libremente si
        desea continuar la relación contractual en los nuevos términos; de lo
        contrario se entenderá terminado el contrato al finalizar el mes de
        preaviso sin penalidad alguna para{' '}
                <strong>EL LICENCIATARIO. PARÁGRAFO PRIMERO:</strong> El precio de la
        licencia de <strong>SOFTWARE WINBY</strong> aumentará el primer día del
        mes de enero de 2022 y, en lo sucesivo, el primer día de enero de cada
        año, de conformidad con el alza de índice de precios al consumidor{' '}
                <strong>(IPC)</strong> para ese año. <strong>PARAGRAFO SEGUNDO:</strong>{' '}
        Este valor incluye: 1) La licencia de uso del software. 2) La
        capacitación necesaria a <strong>EL LICENCIATARIO </strong> para el
        adecuado y productivo uso del software. 3) La documentación necesaria
        para la operación del programa y el manejo de la aplicación.{' '}
                <strong>PARAGRAFO TERCERO:</strong> El pago de la licencia podrá ser
        efectuado a través de la pasarela de pagos que para tal efecto tiene
        desarrollado el <strong>SOFTWARE WINBY</strong> o consignando
        directamente a la cuenta de ahorros No del Banco de Colombia. Para esta
        última <strong>EL LICENCIATARIO</strong> está en la obligación de subir
        al sistema la evidencia del pago.
                <br />
                <br />
                <strong>CLÁUSULA OCTAVA. NUEVOS DESARROLLOS. EL LICENCIANTE</strong> no
        se obliga a desarrollar nuevas funcionalidades, módulos del programa o
        características, y en caso de desarrollarlas no se encuentra obligado a
        suministrarlas ni a permitir su uso a <strong>EL LICENCIATARIO</strong>{' '}
        aún mediante la adquisición de una nueva licencia.
                <br />
                <br />
                <strong>CLÁUSULA NOVENA. ACTUALIZACIONES:</strong> Para identificar las
        versiones del <strong>SOFTWARE WINBY</strong> se utilizará el siguiente
        sistema numérico: cada versión tendrá tres números separados por puntos,
        el primer número identifica los cambios generales y la inclusión de
        nuevos módulos al <strong>SOFTWARE WINBY,</strong> el segundo número
        identifica la inclusión de nuevas funcionalidades a módulos existentes y
        el tercer número identifica la solución a errores para permitir el
        correcto funcionamiento del <strong>SOFTWARE WINBY.</strong> De acuerdo
        a lo anterior, las actualizaciones serán de tres clases: las que
        corrigen errores de la versión anterior para permitir su correcto
        funcionamiento, las cuales se identifican variando el tercer número de
        la versión. Habrá actualizaciones que incluyan nuevas funcionalidades en
        módulos existentes las cuales se identifican con la variación del
        segundo número de la versión. Finalmente existirán actualizaciones que
        comportan cambios generales y la inclusión de nuevos módulos al{' '}
                <strong>SOFTWARE WINBY</strong> las cuales se identifican con la
        variación del primer número de la versión.{' '}
                <strong>EL LICENCIATARIO</strong> podrá, adquirir actualizaciones del{' '}
                <strong>SOFTWARE WINBY,</strong> sin perjuicio de lo establecido en la
        Cláusula 7 de este contrato. <strong>EL LICENCIATARIO</strong> tendrá
        derecho a acceder y usar actualizaciones de correcciones de errores de
        la versión para la cual adquiere la licencia, es decir, actualizaciones
        que se identifiquen con la variación del tercer número de la versión,
        mientras se encuentre en el término de garantía en los términos de este
        contrato o se haya contratado el servicio de soporte técnico con{' '}
                <strong>EL LICENCIANTE.</strong>
                <br />
                <br />
                <strong>
                                        CLÁUSULA DÉCIMA. GARANTÍA DE FUNCIONAMIENTO: EL LICENCIANTE
                </strong>{' '}
        garantiza a <strong>EL LICENCIATARIO</strong> que la versión de{' '}
                <strong>EL SOFTWARE WINBY</strong> amparado por este contrato, cumplirá
        las funciones descritas, bajo su normal uso durante la vigencia de este
        contrato. La responsabilidad de <strong>EL LICENCIANTE</strong> en
        relación con dicha reclamación de garantía se limitará, a discreción de{' '}
                <strong>EL LICENCIANTE,</strong> a brindar soporte técnico del{' '}
                <strong>SOFTWARE WINBY</strong> basado en reclamación de garantía, o a
        desarrollar y liberar nuevas versiones para la corrección de errores que
        impidan su correcto funcionamiento. <strong>PARÁGRAFO PRIMERO:</strong>{' '}
        El uso del <strong>SOFTWARE WINBY</strong> no garantiza la obtención de
        beneficios económicos para <strong>EL LICENCIATARIO</strong> ni el
        aumento del rendimiento y/o la optimización de procesos de la actividad
        económica o empresarial que desarrolle{' '}
                <strong>EL LICENCIATARIO.</strong> De acuerdo a lo anterior,{' '}
                <strong>EL LICENCIANTE</strong> no promete a{' '}
                <strong>EL LICENCIATARIO</strong> la obtención de alguno de éstos y no
        será responsable frente a este último por el resultado del uso del{' '}
                <strong>SOFTWARE WINBY,</strong> porque el <strong>(IPC)</strong> para
        ese año. <strong>SOFTWARE WINBY</strong> funge como una herramienta para
        gestión de la venta de productos y servicios, pero requiere de la acción
        de <strong>EL LICENCIATARIO </strong> para generar ingresos como
        resultado de la venta de productos y servicios.
                <br />
                <br />
                <strong>
                                        CLÁUSULA DÉCIMA PRIMERA. SERVICIO DE SOPORTE: EL LICENCIANTE
                </strong>{' '}
        brindará servicio de soporte técnico a <strong>EL LICENCIATARIO</strong>{' '}
        durante todo el plazo de la <strong>LICENCIA TEMPORAL.</strong> Con
        ocasión de la prestación del servicio de soporte{' '}
                <strong>EL LICENCIANTE</strong> se obliga a: 1) Corregir problemas del{' '}
                <strong>SOFTWARE WINBY</strong> que impidan su funcionamiento. 2)
        Responder a las preguntas de <strong>EL LICENCIATARIO</strong> en cuanto
        al uso del <strong>SOFTWARE WINBY. PARÁGRAFO PRIMERO:</strong> Los
        requerimientos de servicio de soporte técnico serán comunicados a{' '}
                <strong>EL LICENCIANTE</strong> mediante mensajes de correo electrónico
        enviados a la dirección electrónica soporte@winby.co.{' '}
                <strong>EL LICENCIANTE</strong> podrá utilizar cualquier solución o
        software de servicio al cliente para administrar y atender los
        requerimientos de soporte técnico y dará respuesta a los requerimientos
        de <strong>EL LICENCIATARIO</strong> mediante mensajes de correo
        electrónico enviados a dirección electrónica mediante la que se remitió
        el requerimiento de soporte técnico. Con todo, cuando{' '}
                <strong>EL LICENCIANTE</strong> lo estime conveniente, el servicio de
        soporte técnico podrá ser prestado telefónicamente o en las
        instalaciones físicas de{' '}
                <strong>EL LICENCIATARIO. PARÁGRAFO SEGUNDO: EL LICENCIANTE </strong>{' '}
        podrá llevar a cabo las capacitaciones respecto del funcionamiento del
        software mediante videoconferencias u otras soluciones audiovisuales.
                <br />
                <br />
                <strong>
                                        CLÁUSULA DÉCIMA SEGUNDA. OBLIGACIONES DEL LICENCIATARIO:
                </strong>{' '}
        Sin perjuicio de las demás obligaciones previstas en este contrato,{' '}
                <strong>EL LICENCIATARIO</strong> se obliga a: 1) Disponer en todo
        momento de los requerimientos mínimos para la ejecución del{' '}
                <strong>SOFTWARE WINBY.</strong> 2) Implementar prácticas de buen manejo
        de contraseñas para las cuentas de usuario del{' '}
                <strong>SOFTWARE WINBY.</strong> 3) Cancelar el valor total del precio
        en la fecha y en las condiciones acordadas. 4) Utilizar el software de
        acuerdo con las condiciones de uso establecidas en este contrato. 5)
        Tomar medidas preventivas usuales en la actividad de computación, con el
        fin de evitar que se produzcan fallas que le causen cualquier tipo de
        daño o perjuicio, ya sea a <strong>EL LICENCIANTE</strong> o a terceros.
        6) Exonerar, en cualquier caso, a <strong>EL LICENCIANTE</strong> de
        toda responsabilidad derivada de los daños o perjuicios que pueda sufrir{' '}
                <strong>EL LICENCIATARIO</strong> como consecuencia directa o indirecta
        del uso inadecuado que se haga del software, 7) Mantener la
        confidencialidad en el uso de la información que le sea revelada,
        durante la vigencia del contrato, subsistiendo dicha obligación una vez
        terminado el mismo.
                <br />
                <br />
                <strong>
                                        CLÁUSULA DÉCIMA TERCERA. OBLIGACIONES DEL LICENCIANTE:
                </strong>{' '}
        Sin perjuicio de las demás obligaciones previstas en este contrato,{' '}
                <strong>EL LICENCIANTE</strong> se obliga a:1) Mantener el software en
        perfecto estado de funcionamiento, de conformidad con las condiciones
        que se describen en el presente contrato. 2) Entregar documentación y
        herramientas necesarias para la operación del programa.
                <br />
                <br />
                <strong>CLÁUSULA DÉCIMA CUARTA. CONFIDENCIALIDAD:</strong> La
        estructura, organización y código fuente del{' '}
                <strong>SOFTWARE WINBY</strong> son secretos comerciales e información
        confidencial valiosa de <strong>EL LICENCIANTE,</strong> por tanto le
        está prohibido expresamente a <strong>EL LICENCIATARIO</strong> y este
        se obliga a favor de <strong>EL LICENCIANTE</strong> a no desarrollar,
        ni em medio de la relación contractual, ni durante los tres (3) años
        siguientes a la fecha de terminación de la{' '}
                <strong>LICENCIA TEMPORAL</strong> o del servicio de soporte técnico,
        programas de computador similares al <strong>SOFTWARE WINBY,</strong> ni
        colaborar con terceros revelando secretos comerciales e información
        confidencial de <strong>EL LICENCIANTE,</strong> y de hacerlo se
        entenderá incumplido este contrato dando lugar a la terminación
        inmediata del mismo y a las indemnizaciones a que haya lugar según este
        contrato y la ley.
                <br />
                <br />
                <strong>CLÁUSULA DÉCIMA QUINTA. PROHIBICIONES:</strong> Se prohíbe a{' '}
                <strong>EL LICENCIATARIO</strong> el arrendamiento, el préstamo, la
        presentación, ejecución o retransmisión pública o cualquier otro tipo de
        distribución de su licencia del <strong>SOFTWARE WINBY.</strong> Así
        mismo le está prohibido a <strong>EL LICENCIATARIO</strong> revender o
        transferir su licencia del <strong>SOFTWARE WINBY,</strong> modificar o
        permitir que terceros modifiquen <strong>EL SOFTWARE WINBY</strong> o
        alguna parte del mismo, analizarlo mediante técnicas de ingeniería
        inversa, traducir, descompilar o desensamblar{' '}
                <strong>EL SOFTWARE WINBY,</strong> ni fabricar productos derivados del
        mismo. <strong>EL SOFTWARE WINBY</strong> puede incluir diversas
        aplicaciones, componentes y módulos, sin embargo,{' '}
                <strong>EL SOFTWARE WINBY</strong> se ha diseñado como un producto único
        para ser utilizado como una unidad, y solo de esta forma le está
        autorizado su uso a <strong>EL LICENCIATARIO.</strong>
                <br />
                <br />
                <strong>
                                        CLÁUSULA DÉCIMA SEXTA. EXCLUSIÓN DE RESPONSABILIDAD: EL LICENCIATARIO
                </strong>{' '}
        usa <strong>EL SOFTWARE WINBY </strong> bajo su exclusiva
        responsabilidad y <strong>EL LICENCIANTE</strong> no tiene ninguna
        injerencia en la forma de uso de <strong>EL SOFTWARE WINBY </strong> por{' '}
                <strong>EL LICENCIATARIO.</strong> De acuerdo a lo anterior,{' '}
                <strong>EL LICENCIANTE</strong> no se obliga con{' '}
                <strong>EL LICENCIATARIO</strong> a evitar ni a responder por las
        pérdidas, daños, reclamaciones o costos de cualquier naturaleza, ni de
        cualquier pérdida de beneficios o ganancias, que resulten del uso del{' '}
                <strong>SOFTWARE WINBY.</strong> Así mismo{' '}
                <strong>EL LICENCIANTE</strong> no se obliga a responder por estos ni a
        evitar daños que resulten de la interrupción de la actividad empresarial
        de <strong>EL LICENCIATARIO</strong> derivadas del uso del{' '}
                <strong>SOFTWARE WINBY. PARAGRAFO:</strong> En el evento en que por
        problemas de funcionamiento del Software o por incumplimiento de
        obligaciones a cargo de <strong>EL LICENCIANTE,</strong> imputables a la
        culpa leve o levísima de éste, se generen perjuicios de cualquier tipo a{' '}
                <strong>EL LICENCIATARIO,</strong> la responsabilidad de{' '}
                <strong>EL LICENCIANTE</strong> estará limitada al monto de lo pagado
        por <strong>EL LICENCIATARIO</strong> por la{' '}
                <strong>LICENCIA TEMPORAL</strong> por un (1) mes.
                <br />
                <br />
                <strong>CLÁUSULA DECIMA SÉPTIMA. CLÁUSULA PENAL:</strong> En el evento
        de incumplimiento por alguna de las partes, sin necesidad de
        requerimiento a la parte incumplida, una vez se haya configurado un
        incumplimiento de las obligaciones contraídas en virtud del presente
        contrato, la parte incumplida reconocerá como sanción por el
        incumplimiento de sus obligaciones ante la parte cumplida una cláusula
        penal pecuniaria equivalente a doce (12) meses de LICENCIA TEMPORAL, sin
        perjuicio de las demás indemnizaciones a que haya lugar según éste
        contrato y la ley. En consecuencia, por el pago de la pena anteriormente
        establecida, no se entienden extinguidas las obligaciones del negocio
        jurídico derivado de este contrato, y por lo tanto la parte cumplida se
        reserva el derecho de reclamar indemnización por daños y perjuicios
        derivados de cualquier incumplimiento por parte de la parte incumplida.
        En el evento en que la cláusula penal exceda el límite legal, ésta se
        reajustará y reducirá al monto máximo legal permitido.
                <br />
                <br />
                <strong>
                                        CLÁUSULA DÉCIMA OCTAVA. OBLIGACIONES DEL LICENCIATARIO AL FINALIZAR EL
                                        TÉRMINO DE VIGENCIA.
                </strong>{' '}
        En el evento de terminación de la licencia por cualquiera de las causas
        previstas, <strong>EL LICENCIATARIO</strong> se obliga a desinstalar
        inmediatamente <strong>EL SOFTWARE WINBY</strong> de sus dispositivos
        por cuenta y riesgo propios. <strong>PARÁGRAFO:</strong> Las
        disposiciones del presente contrato que, por su naturaleza, estén
        destinadas a subsistir tras la terminación del mismo, seguirán vigentes
        tras su rescisión o expiración.
                <br />
                <br />
                <strong>CLÁUSULA DÉCIMA NOVENA. VIGENCIA DEL CONTRATO.</strong> CLÁUSULA
        DÉCIMA NOVENA. VIGENCIA DEL CONTRATO.
                <br />
                <br />
                <strong>CLÁUSULA VIGÉSIMA: CESIÓN.</strong> El presente contrato no
        puede ser cedido por <strong>EL LICENCIATARIO</strong> total ni
        parcialmente, salvo autorización previa y escrita por parte de{' '}
                <strong>EL LICENCIANTE.</strong>
                <br />
                <br />
                <strong>
                                        CLÁUSULA VIGÉSIMA PRIMERA: TERMINACIÓN. EL LICENCIANTE
                </strong>{' '}
        o <strong>EL LICENCIATARIO</strong> podrán dar por terminado en
        cualquier momento el presente Contrato, mediante notificación por
        escrito al domicilio de la otra Parte con tres meses de anticipación a
        la fecha en que efectivamente tendrá lugar dicha terminación anticipada,
        y en todo caso subsistirán todas las obligaciones que se encuentren
        pendientes al momento de la terminación por cada una de las Partes. En
        caso de que se dé la terminación anticipada del Contrato,{' '}
                <strong>EL LICENCIATARIO</strong> deberá cesar totalmente en el uso de{' '}
                <strong>EL SOFTWARE WINBY,</strong> así como el uso de cualquier
        material de propiedad de <strong>EL LICENCIANTE</strong> que éste le
        haya otorgado en virtud del presente Contrato, dentro de los 30 días
        hábiles siguientes contados a partir de la fecha de recibo de la
        notificación enviada por la parte que solicita la terminación del
        contrato. También podrá darse la terminación anticipada del Contrato por
        incumplimiento grave de cualquiera de las obligaciones por parte de{' '}
                <strong>EL LICENCIATARIO. PARÁGRAFO PRIMERO.</strong> La terminación
        anticipada de este Contrato por cualquier causa no liberará a las Partes
        del cumplimiento de obligaciones pendientes a favor de la otra Parte.{' '}
                <strong>PARAGRAFO SEGUNDO: </strong> A efectos de proteger el{' '}
                <strong>SOFTWARE WINBY</strong> y los derechos patrimoniales, derechos
        morales, de propiedad industrial, derechos de autor, etc., de que es
        titular <strong>EL LICENCIANTE</strong> sobre{' '}
                <strong> El SOFTWARE WINBY,</strong> el incumplimiento por parte de{' '}
                <strong>EL LICENCIATARIO</strong> de cualquiera de las obligaciones
        previstas en este contrato dará lugar a la terminación de la licencia y
        a la aplicación de lo dispuesto en las Cláusulas Décima séptima y Décima
        Octava de este contrato, sin que haya lugar a la devolución de suma
        alguna de dinero a <strong>EL LICENCIATARIO.</strong>
                <br />
                <br />
                <strong>
                                        CLÁUSULA VIGÉSIMA SEGUNDA: INFRACCIONES. EL LICENCIANTE,
                </strong>{' '}
        queda obligado a realizar todas las actividades necesarias y a iniciar
        las acciones legales del caso para la defensa de{' '}
                <strong>EL SOFTWARE WINBY,</strong> objeto del presente contrato. En el
        supuesto de que <strong>EL LICENCIATARIO</strong> tenga conocimiento de
        cualquier violación o supuesta violación de los derechos que detenta{' '}
                <strong>EL LICENCIANTE</strong> sobre dicho software, piratería o uso
        indebido del mismo, o cualquier acto de competencia desleal que
        comprenda el referido programa deberá ponerlo de inmediato en
        conocimiento de <strong>EL LICENCIANTE,</strong> a quien prestará toda
        la información y colaboración necesaria en el caso de que se decidiera
        iniciar acciones legales. La legitimación para el ejercicio de las
        acciones será de <strong>EL LICENCIANTE,</strong> pudiendo ser realizada
        conjuntamente por ambas partes si así lo acordaren. En todo caso,{' '}
                <strong>EL LICENCIANTE</strong> se obliga a defender los derechos de
        autor generados sobre el software licenciado utilizando todos los medios
        previstos en Derecho. Los gastos ocasionados por la defensa del software
        licenciado estarán a cargo de <strong>EL LICENCIANTE.</strong> En caso
        de que se entable una demanda o se formule una acción contra{' '}
                <strong>EL LICENCIATARIO</strong> dando aviso por escrito a{' '}
                <strong>EL LICENCIATARIO</strong> por parte de un tercero que alegue
        infracción de dichos derechos del tercero que resulten del uso por parte
        de <strong>EL LICENCIATARIO</strong> del software, éste informará sobre
        dicha demanda de inmediato a <strong>EL LICENCIANTE</strong> sin
        perjuicio de cualquier defensa posible.{' '}
                <strong>EL LICENCIATARIO,</strong> sin aceptar ninguna responsabilidad,
        dará toda la ayuda razonable a <strong>EL LICENCIANTE</strong> para
        inpugnar dichas demandas o acciones.
                <br />
                <br />
                <strong>CLÁUSULA VIGÉSIMA TERCERA: DECLARACIONES.</strong> Además de las
        declaraciones y garantías contenidas en cualquier otra disposición de
        este contrato, cada una de las partes declara y garantiza a la otra que:
        1) Tiene pleno poder y autoridad para firmar, ser parte y ejecutar este
        contrato. 2) Este contrato una vez sea firmado, constituirá una
        obligación válida de dicha parte y exigible ejecutivamente de
        conformidad con sus términos y a la legislación aplicable. 3) Las partes
        declaran que este contrato no viola ningún contrato del que sean parte,
        ni las leyes o reglamentos que de alguna manera les sean aplicables.
                <br />
                <br />
                <strong>CLÁUSULA VIGÉSIMA CUARTA. LEGISLACIÓN APLICABLE:</strong> El
        presente contrato se regirá, se interpretará, y toda controversia que
        derive o guarde relación con él habrá de ser resuelta conforme al
        derecho de la República de Colombia.
                <br />
                <br />
                <strong>CLÁUSULA VIGÉSIMA QUINTA: LEGALIDAD.</strong> Ambas partes
        acuerdan que en caso de que alguno de los términos o condiciones que le
        dan forma y contenido al presente contrato sea declarado como nulo,
        ilegal o inaplicable por autoridad competente, todas las demás
        condiciones y términos seguirán surtiendo plenos efectos para las
        partes, siempre y cuando el objeto substancial del contrato no se vea
        afectado.
                <br />
                <br />
                <strong>CLÁUSULA VIGÉSIMA SEXTA. CLÁUSULA COMPROMISORIA: </strong> Las
        partes convienen que toda controversia o diferencia relativa a este
        contrato y al cumplimiento de cualquiera de las obligaciones señaladas
        en el mismo será resuelta así: 1. En primera instancia por acuerdo entre
        las partes. El cual constara en acta suscrita por las partes para tales
        efectos; 2. En segunda instancia, de no ser posible el acuerdo entre las
        partes, mediante conciliación realizada por las partes a través del
        centro de Conciliación, arbitraje y amigable composición de la Fundación
        Liborio Mejía en la ciudad de Barranquilla; y 3. En su defecto, por un
        Tribunal de Arbitramento del centro de Conciliación, arbitraje y
        amigable composición de la Fundación Liborio Mejía en la ciudad de
        Barranquilla, el cual se ajustará a lo dispuesto por el Código de
        Comercio, y funcionará de acuerdo a las siguientes reglas: a) El
        Tribunal estará integrado por tres (3) árbitros elegidos de común
        acuerdo por las partes, de la lista que para tal efecto lleve el centro
        de Conciliación, arbitraje y amigable composición de la Fundación
        Liborio Mejía. En el evento que no haya acuerdo, las partes delegan
        expresamente en el centro de Conciliación, arbitraje y amigable
        composición de la Fundación Liborio Mejía la designación de los árbitros
        conforme a lo señalado en su reglamento interno. b) La organización
        interna del Tribunal se sujetará a las reglas internas previstas para el
        efecto por el centro de Conciliación, arbitraje y amigable composición
        de la Fundación Liborio Mejía; c) El Tribunal decidirá en derecho; d. El
        secretario del tribunal de arbitramento será elegido, por el centro de
        conciliación y arbitraje, de la lista oficial de secretarios del Centro
        de Conciliación y Arbitraje Empresarial. d) El Tribunal operará en la
        ciudad de Barranquilla en el centro de Conciliación, arbitraje y
        amigable composición de la Fundación Liborio Mejía. Las conciliaciones
        que ocurrieren, se regirán por lo dispuesto en la Ley 640 de 2001, y en
        las demás normas que modifiquen o adicionen la materia.{' '}
                <strong>PARAGRAFO I: DOMICILIO:</strong> Para todos los efectos
        contractuales las partes fijan como domicilio la ciudad de Barranquilla;
        y para efectos de notificación las partes aportan sus datos de contacto
        al pie de sus firmas.
                <br />
                <br />
        Para constancia las Partes suscriben el presente contrato en dos (2)
        ejemplares de igual tenor y fuerza legal, el día _________ del mes de
        __________________ del año __________.
                <br />
                <br />
                <Flex marginTop="20px">
                    <div>
                                                _________________________________________
                        <br />
            ANGELO DEL CASTILLO MIRANDA
                        <br />
            Rep. Legal WINBY BUSINESS GROUP S.A.S.
                        <br />
            EL LICENCIANTE
                        <br />
            Dirección: Cra 60 No 75 – 102
                        <br />
            Mail: servicioalcliente1@winby.co
                        <br />
            Tels: (57) 5 3394667 – 3154009107
                    </div>
                    <div>
                                                _________________________________________
                        <br />
                        {state?.values?.up_name} {state?.values?.up_last}
                        <br />
                        {state?.values?.up_ideNum}
                        <br />
            EL LICENCIATARIO
                        <br />
            Dirección: {state?.values?.up_location}
                        <br />
            Mail: {state?.values?.u_email}
                        <br />
            Tels: {state?.values?.u_phoNum}
                    </div>
                </Flex>
            </Textarea>
            <Flex justify="center">
                <Link>
                                        Winbyoficial.co{' '}
                    <Img src="https://images.vexels.com/media/users/3/137253/isolated/preview/90dd9f12fdd1eefb8c8976903944c026-icono-de-facebook-logo-by-vexels.png" />
                </Link>
                <Link borderLeft="red" borderRight="red">
                                        winbyoficial{' '}
                    <Img src="https://image.flaticon.com/icons/png/512/134/134937.png" />
                </Link>
                <Link>
                                        @winbyoficial{' '}
                    <Img src="https://images.vexels.com/media/users/3/137380/isolated/preview/1b2ca367caa7eff8b45c09ec09b44c16-icono-de-instagram-logo-by-vexels.png" />
                </Link>
            </Flex>
            <Flex justify="center">
                <Link color="red">www.Winby.co</Link>
            </Flex>
        </Scrollbars>
    </Box>
);

const Flex = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify || 'space-between'};
  align-items: center;
  flex-wrap: wrap;
  ${({ marginTop }) => marginTop &&
                css`
      margin-top: ${marginTop};
    `}
  margin-bottom: 10px;
`;
const Link = styled.button`
  margin: 2px;
  border: none;
  ${({ borderLeft }) => borderLeft &&
                css`
      border-left: ${borderLeft};
    `}
  ${({ borderRight }) => borderRight &&
                css`
      border-right: ${borderRight};
    `}
    ${({ color }) => color &&
                css`
      color: ${color};
    `}
    background-color: transparent;
  cursor: pointer;
  outline: none;
`;
const Img = styled.img`
  width: 20px;
  height: 20px;
`;
const LOGOP = styled.div`
  background-image: url(${logoWinby});
  width: 60px;
  height: 90px;
  margin: auto;
  margin-top: 20px;
`;
const Textarea = styled.div`
  font-size: 14px;
  padding: 20px 50px;
  text-align: justify;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;
const Box = styled.div`
  background-image: url(${fondoTextura});
  padding: 20px 0;
  border-radius: 10px;
  height: 100%;
  margin-top:50px;
`;
const H3 = styled.h3`
  text-align: center;
  @media (max-width: 650px) {
    margin: 20px;
  }
`;