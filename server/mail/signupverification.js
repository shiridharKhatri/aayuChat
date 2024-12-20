const nodemailer = require("nodemailer");

const sendVerificationCode = async (email, subject, name, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: subject,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html
        dir="ltr"
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        lang="en"
      >
        <head>
          <meta charset="UTF-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta content="telephone=no" name="format-detection" />
          <title>New Template</title>
          <!--[if (mso 16)]>
            <style type="text/css">
              a {
                text-decoration: none;
              }
            </style>
          <![endif]-->
          <!--[if gte mso 9
            ]><style>
              sup {
                font-size: 100% !important;
              }
            </style><!
          [endif]-->
          <!--[if gte mso 9]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          <![endif]-->
          <!--[if !mso]><!-- -->
          <link
            href="https://fonts.googleapis.com/css2?family=Prompt:wght@500&display=swap"
            rel="stylesheet"
          />
          <!--<![endif]-->
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
            .es-button {
              mso-style-priority: 100 !important;
              text-decoration: none !important;
            }
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
            }
            .es-desk-hidden {
              display: none;
              float: left;
              overflow: hidden;
              width: 0;
              max-height: 0;
              line-height: 0;
              mso-hide: all;
            }
            .es-button-border:hover a.es-button,
            .es-button-border:hover button.es-button {
              background: #48dbea !important;
            }
            .es-button-border:hover {
              border-color: #42d159 #42d159 #42d159 #42d159 !important;
              background: #48dbea !important;
            }
            td .es-button-border-1705644534720:hover {
              border-color: transparent transparent transparent transparent !important;
              background: #3ab1fd !important;
            }
            td .es-button-border:hover a.es-button-1705644559473 {
              background: #3ab1fd !important;
            }
            td .es-button-border:hover a.es-button-1705644622838 {
              background: #3ab1fd !important;
            }
            td .es-button-border-1705644622873:hover {
              background: #3ab1fd !important;
            }
            @media only screen and (max-width: 600px) {
              p,
              ul li,
              ol li,
              a {
                line-height: 150% !important;
              }
              h1,
              h2,
              h3,
              h1 a,
              h2 a,
              h3 a {
                line-height: 120%;
              }
              h1 {
                font-size: 30px !important;
                text-align: left;
              }
              h2 {
                font-size: 24px !important;
                text-align: left;
              }
              h3 {
                font-size: 20px !important;
                text-align: left;
              }
              .es-header-body h1 a,
              .es-content-body h1 a,
              .es-footer-body h1 a {
                font-size: 30px !important;
                text-align: left;
              }
              .es-header-body h2 a,
              .es-content-body h2 a,
              .es-footer-body h2 a {
                font-size: 24px !important;
                text-align: left;
              }
              .es-header-body h3 a,
              .es-content-body h3 a,
              .es-footer-body h3 a {
                font-size: 20px !important;
                text-align: left;
              }
              .es-menu td a {
                font-size: 12px !important;
              }
              .es-header-body p,
              .es-header-body ul li,
              .es-header-body ol li,
              .es-header-body a {
                font-size: 14px !important;
              }
              .es-content-body p,
              .es-content-body ul li,
              .es-content-body ol li,
              .es-content-body a {
                font-size: 14px !important;
              }
              .es-footer-body p,
              .es-footer-body ul li,
              .es-footer-body ol li,
              .es-footer-body a {
                font-size: 12px !important;
              }
              .es-infoblock p,
              .es-infoblock ul li,
              .es-infoblock ol li,
              .es-infoblock a {
                font-size: 12px !important;
              }
              *[class="gmail-fix"] {
                display: none !important;
              }
              .es-m-txt-c,
              .es-m-txt-c h1,
              .es-m-txt-c h2,
              .es-m-txt-c h3 {
                text-align: center !important;
              }
              .es-m-txt-r,
              .es-m-txt-r h1,
              .es-m-txt-r h2,
              .es-m-txt-r h3 {
                text-align: right !important;
              }
              .es-m-txt-l,
              .es-m-txt-l h1,
              .es-m-txt-l h2,
              .es-m-txt-l h3 {
                text-align: left !important;
              }
              .es-m-txt-r img,
              .es-m-txt-c img,
              .es-m-txt-l img {
                display: inline !important;
              }
              .es-button-border {
                display: inline-block !important;
              }
              a.es-button,
              button.es-button {
                font-size: 16px !important;
                display: inline-block !important;
              }
              .es-adaptive table,
              .es-left,
              .es-right {
                width: 100% !important;
              }
              .es-content table,
              .es-header table,
              .es-footer table,
              .es-content,
              .es-footer,
              .es-header {
                width: 100% !important;
                max-width: 600px !important;
              }
              .es-adapt-td {
                display: block !important;
                width: 100% !important;
              }
              .adapt-img {
                width: 100% !important;
                height: auto !important;
              }
              .es-m-p0 {
                padding: 0 !important;
              }
              .es-m-p0r {
                padding-right: 0 !important;
              }
              .es-m-p0l {
                padding-left: 0 !important;
              }
              .es-m-p0t {
                padding-top: 0 !important;
              }
              .es-m-p0b {
                padding-bottom: 0 !important;
              }
              .es-m-p20b {
                padding-bottom: 20px !important;
              }
              .es-mobile-hidden,
              .es-hidden {
                display: none !important;
              }
              tr.es-desk-hidden,
              td.es-desk-hidden,
              table.es-desk-hidden {
                width: auto !important;
                overflow: visible !important;
                float: none !important;
                max-height: inherit !important;
                line-height: inherit !important;
              }
              tr.es-desk-hidden {
                display: table-row !important;
              }
              table.es-desk-hidden {
                display: table !important;
              }
              td.es-desk-menu-hidden {
                display: table-cell !important;
              }
              .es-menu td {
                width: 1% !important;
              }
              table.es-table-not-adapt,
              .esd-block-html table {
                width: auto !important;
              }
              table.es-social {
                display: inline-block !important;
              }
              table.es-social td {
                display: inline-block !important;
              }
              .es-desk-hidden {
                display: table-row !important;
                width: auto !important;
                overflow: visible !important;
                max-height: inherit !important;
              }
              .es-m-p5 {
                padding: 5px !important;
              }
              .es-m-p5t {
                padding-top: 5px !important;
              }
              .es-m-p5b {
                padding-bottom: 5px !important;
              }
              .es-m-p5r {
                padding-right: 5px !important;
              }
              .es-m-p5l {
                padding-left: 5px !important;
              }
              .es-m-p10 {
                padding: 10px !important;
              }
              .es-m-p10t {
                padding-top: 10px !important;
              }
              .es-m-p10b {
                padding-bottom: 10px !important;
              }
              .es-m-p10r {
                padding-right: 10px !important;
              }
              .es-m-p10l {
                padding-left: 10px !important;
              }
              .es-m-p15 {
                padding: 15px !important;
              }
              .es-m-p15t {
                padding-top: 15px !important;
              }
              .es-m-p15b {
                padding-bottom: 15px !important;
              }
              .es-m-p15r {
                padding-right: 15px !important;
              }
              .es-m-p15l {
                padding-left: 15px !important;
              }
              .es-m-p20 {
                padding: 20px !important;
              }
              .es-m-p20t {
                padding-top: 20px !important;
              }
              .es-m-p20r {
                padding-right: 20px !important;
              }
              .es-m-p20l {
                padding-left: 20px !important;
              }
              .es-m-p25 {
                padding: 25px !important;
              }
              .es-m-p25t {
                padding-top: 25px !important;
              }
              .es-m-p25b {
                padding-bottom: 25px !important;
              }
              .es-m-p25r {
                padding-right: 25px !important;
              }
              .es-m-p25l {
                padding-left: 25px !important;
              }
              .es-m-p30 {
                padding: 30px !important;
              }
              .es-m-p30t {
                padding-top: 30px !important;
              }
              .es-m-p30b {
                padding-bottom: 30px !important;
              }
              .es-m-p30r {
                padding-right: 30px !important;
              }
              .es-m-p30l {
                padding-left: 30px !important;
              }
              .es-m-p35 {
                padding: 35px !important;
              }
              .es-m-p35t {
                padding-top: 35px !important;
              }
              .es-m-p35b {
                padding-bottom: 35px !important;
              }
              .es-m-p35r {
                padding-right: 35px !important;
              }
              .es-m-p35l {
                padding-left: 35px !important;
              }
              .es-m-p40 {
                padding: 40px !important;
              }
              .es-m-p40t {
                padding-top: 40px !important;
              }
              .es-m-p40b {
                padding-bottom: 40px !important;
              }
              .es-m-p40r {
                padding-right: 40px !important;
              }
              .es-m-p40l {
                padding-left: 40px !important;
              }
            }
            @media screen and (max-width: 384px) {
              .mail-message-content {
                width: 414px !important;
              }
            }
          </style>
        </head>
        <body
          style="
            width: 100%;
            font-family: arial, 'helvetica neue', helvetica, sans-serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            padding: 0;
            margin: 0;
          "
        >
          <div
            dir="ltr"
            class="es-wrapper-color"
            lang="en"
            style="background-color: #ffffff"
          >
            <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" color="#ffffff"></v:fill>
              </v:background>
            <![endif]-->
            <table
              class="es-wrapper"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                padding: 0;
                margin: 0;
                width: 100%;
                height: 100%;
                background-repeat: repeat;
                background-position: center top;
                background-color: #ffffff;
              "
            >
              <tr>
                <td valign="top" style="padding: 0; margin: 0">
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    class="es-header"
                    align="center"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      table-layout: fixed !important;
                      width: 100%;
                      background-color: transparent;
                      background-repeat: repeat;
                      background-position: center top;
                    "
                  >
                    <tr>
                      <td align="center" style="padding: 0; margin: 0">
                        <table
                          bgcolor="#ffffff"
                          class="es-header-body"
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            background-color: #ffffff;
                            width: 600px;
                          "
                        >
                          <tr>
                            <td align="left" style="padding: 20px; margin: 0">
                              <!--[if mso]><table style="width:560px" cellpadding="0"
                                  cellspacing="0"><tr><td style="width:210px" valign="top"><![endif]-->
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                class="es-left"
                                align="left"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: left;
                                "
                              >
                                <tr>
                                  <td
                                    class="es-m-p0r es-m-p20b"
                                    valign="top"
                                    align="center"
                                    style="padding: 0; margin: 0; width: 210px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          class="es-m-txt-c"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-top: 5px;
                                            padding-bottom: 5px;
                                            font-size: 0px;
                                          "
                                        >
                                          <img
                                            src="https://dnttuk.stripocdn.email/content/guids/CABINET_afbfaff1a230e49f006d99d7cfa9ad8a1a33bdf6e5bf72cb3a4a410d015fa19f/images/mainlogo_mWl.png"
                                            alt="Logo"
                                            style="
                                              display: block;
                                              border: 0;
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                              font-size: 12px;
                                            "
                                            height="41"
                                            title="Logo"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <!--[if mso]></td><td style="width:20px"></td><td style="width:330px" valign="top"><![endif]-->
                              <table
                                class="es-right"
                                cellpadding="0"
                                cellspacing="0"
                                align="right"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  float: right;
                                "
                              >
                                <tr class="es-mobile-hidden">
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 330px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="right"
                                          style="padding: 0; margin: 0"
                                        >
                                          <!--[if mso
                                            ]><a href="#" target="_blank" hidden>
                                              <v:roundrect
                                                xmlns:v="urn:schemas-microsoft-com:vml"
                                                xmlns:w="urn:schemas-microsoft-com:office:word"
                                                esdevVmlButton
                                                href="#"
                                                style="
                                                  height: 41px;
                                                  v-text-anchor: middle;
                                                  width: 115px;
                                                "
                                                arcsize="50%"
                                                stroke="f"
                                                fillcolor="#3ab1fd"
                                              >
                                                <w:anchorlock></w:anchorlock>
                                                <center
                                                  style="
                                                    color: #ffffff;
                                                    font-family: Prompt, sans-serif;
                                                    font-size: 15px;
                                                    font-weight: 400;
                                                    line-height: 15px;
                                                    mso-text-raise: 1px;
                                                  "
                                                >
                                                  Log in
                                                </center>
                                              </v:roundrect></a
                                            > <!
                                          [endif]--><!--[if !mso]><!-- --><span
                                            class="msohide es-button-border-1705644534720 es-button-border"
                                            style="
                                              border-style: solid;
                                              border-color: transparent;
                                              background: #3ab1fd;
                                              border-width: 0px;
                                              display: inline-block;
                                              border-radius: 30px;
                                              width: auto;
                                              mso-hide: all;
                                            "
                                            ><a
                                              href="#"
                                              class="es-button es-button-1705644559473"
                                              style="
                                                mso-style-priority: 100 !important;
                                                text-decoration: none;
                                                -webkit-text-size-adjust: none;
                                                -ms-text-size-adjust: none;
                                                mso-line-height-rule: exactly;
                                                color: #ffffff;
                                                font-size: 18px;
                                                display: inline-block;
                                                background: #3ab1fd;
                                                border-radius: 30px;
                                                font-family: Prompt, sans-serif;
                                                font-weight: normal;
                                                font-style: normal;
                                                line-height: 22px;
                                                width: auto;
                                                text-align: center;
                                                padding: 10px 20px 10px 20px;
                                                mso-padding-alt: 0;
                                                mso-border-alt: 10px solid #3ab1fd;
                                              "
                                              >Log in</a
                                            ></span
                                          ><!--<![endif]-->
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    class="es-content"
                    cellspacing="0"
                    cellpadding="0"
                    align="center"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      table-layout: fixed !important;
                      width: 100%;
                    "
                  >
                    <tr>
                      <td align="center" style="padding: 0; margin: 0">
                        <table
                          class="es-content-body"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            background-color: #ffffff;
                            width: 600px;
                          "
                          cellspacing="0"
                          cellpadding="0"
                          bgcolor="#ffffff"
                          align="center"
                          role="none"
                        >
                          <tr>
                            <td
                              align="left"
                              style="
                                padding: 0;
                                margin: 0;
                                padding-top: 20px;
                                padding-left: 20px;
                                padding-right: 20px;
                              "
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style="padding: 0; margin: 0; width: 560px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: separate;
                                        border-spacing: 0px;
                                        border-left: 1px solid #dfdfdf;
                                        border-right: 1px solid #dfdfdf;
                                        border-top: 1px solid #dfdfdf;
                                        border-bottom: 1px solid #dfdfdf;
                                        border-radius: 30px;
                                      "
                                      role="presentation"
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            padding: 20px;
                                            margin: 0;
                                            font-size: 0px;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href="#"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #16a1af;
                                              font-size: 14px;
                                            "
                                            ><img
                                              class="adapt-img"
                                              src="https://dnttuk.stripocdn.email/content/guids/CABINET_c42515956e57e0ac3a4ba8b355e345ad75692576f7e871586d13051dbffa848d/images/contact.gif"
                                              alt="Invite your friends "
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                                border-radius: 20px;
                                              "
                                              width="518"
                                              title="Invite your friends "
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              style="
                                margin: 0;
                                padding-left: 20px;
                                padding-right: 20px;
                                padding-top: 30px;
                                padding-bottom: 30px;
                              "
                            >
                              <table
                                cellspacing="0"
                                cellpadding="0"
                                width="100%"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    class="es-m-p0r"
                                    valign="top"
                                    align="center"
                                    style="padding: 0; margin: 0; width: 560px"
                                  >
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          style="padding: 0; margin: 0"
                                        >
                                          <h1
                                            style="
                                              margin: 0;
                                              line-height: 54px;
                                              mso-line-height-rule: exactly;
                                              font-family: Prompt, sans-serif;
                                              font-size: 36px;
                                              font-style: normal;
                                              font-weight: normal;
                                              color: #333333;
                                            "
                                          >
                                            ${subject}
                                          </h1>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-top: 20px;
                                            padding-bottom: 30px;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            Hey ${name},
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            <br />
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            Thanks for joining AayuChat! Your
                                            verification code is:<span
                                              style="color: #3ab1fd"
                                            >
                                              <b>${code}</b></span
                                            >
                                            Enter this code to unlock a world of
                                            conversations.<br /><br />Best regards,<br />The
                                            <b>AayuChat</b> Team
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style="padding: 0; margin: 0"
                                        >
                                          <!--[if mso
                                            ]><a href="#" target="_blank" hidden>
                                              <v:roundrect
                                                xmlns:v="urn:schemas-microsoft-com:vml"
                                                xmlns:w="urn:schemas-microsoft-com:office:word"
                                                esdevVmlButton
                                                href="#"
                                                style="
                                                  height: 41px;
                                                  v-text-anchor: middle;
                                                  width: 124px;
                                                "
                                                arcsize="50%"
                                                stroke="f"
                                                fillcolor="#3ab1fd"
                                              >
                                                <w:anchorlock></w:anchorlock>
                                                <center
                                                  style="
                                                    color: #101010;
                                                    font-family: Prompt, sans-serif;
                                                    font-size: 15px;
                                                    font-weight: 400;
                                                    line-height: 15px;
                                                    mso-text-raise: 1px;
                                                  "
                                                >
                                                  ${code}
                                                </center>
                                              </v:roundrect></a
                                            > <!
                                          [endif]--><!--[if !mso]><!-- --><span
                                            class="msohide es-button-border-1705644622873 es-button-border"
                                            style="
                                              border-style: solid;
                                              border-color: #2cb543;
                                              background: #3ab1fd;
                                              border-width: 0px;
                                              display: inline-block;
                                              border-radius: 30px;
                                              width: auto;
                                              mso-hide: all;
                                            "
                                            ><a
                                              href="#"
                                              class="es-button es-button-1705644622838"
                                              target="_blank"
                                              style="
                                                mso-style-priority: 100 !important;
                                                text-decoration: none;
                                                -webkit-text-size-adjust: none;
                                                -ms-text-size-adjust: none;
                                                mso-line-height-rule: exactly;
                                                color: #101010;
                                                font-size: 18px;
                                                display: inline-block;
                                                background: #3ab1fd;
                                                border-radius: 30px;
                                                font-family: Prompt, sans-serif;
                                                font-weight: normal;
                                                font-style: normal;
                                                line-height: 22px;
                                                width: auto;
                                                text-align: center;
                                                padding: 10px 20px 10px 20px;
                                                mso-padding-alt: 0;
                                                mso-border-alt: 10px solid #3ab1fd;
                                              "
                                              >${code}</a
                                            ></span
                                          ><!--<![endif]-->
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    class="es-footer"
                    align="center"
                    role="none"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      table-layout: fixed !important;
                      width: 100%;
                      background-color: transparent;
                      background-repeat: repeat;
                      background-position: center top;
                    "
                  >
                    <tr>
                      <td align="center" style="padding: 0; margin: 0">
                        <table
                          bgcolor="#ffffff"
                          class="es-footer-body"/
                          align="center"
                          cellpadding="0"
                          cellspacing="0"
                          role="none"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            background-color: #ffffff;
                            width: 600px;
                          "
                        >
                          <tr>
                            <td align="left" style="padding: 20px; margin: 0">
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="none"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 560px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-top: 10px;
                                            padding-bottom: 20px;
                                            font-size: 0;
                                          "
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            class="es-table-not-adapt es-social"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                valign="top"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-right: 20px;
                                                "
                                              >
                                                <a
                                                  target="_blank"
                                                  href="#"
                                                  style="
                                                    -webkit-text-size-adjust: none;
                                                    -ms-text-size-adjust: none;
                                                    mso-line-height-rule: exactly;
                                                    text-decoration: underline;
                                                    color: #333333;
                                                    font-size: 14px;
                                                  "
                                                  ><img
                                                    title="Instagram"
                                                    src="https://dnttuk.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png"
                                                    alt="Inst"
                                                    height="24"
                                                    style="
                                                      display: block;
                                                      border: 0;
                                                      outline: none;
                                                      text-decoration: none;
                                                      -ms-interpolation-mode: bicubic;
                                                    "
                                                /></a>
                                              </td>
                                              <td
                                                align="center"
                                                valign="top"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-right: 20px;
                                                "
                                              >
                                                <a
                                                  target="_blank"
                                                  href="#"
                                                  style="
                                                    -webkit-text-size-adjust: none;
                                                    -ms-text-size-adjust: none;
                                                    mso-line-height-rule: exactly;
                                                    text-decoration: underline;
                                                    color: #333333;
                                                    font-size: 14px;
                                                  "
                                                  ><img
                                                    title="Facebook"
                                                    src="https://dnttuk.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png"
                                                    alt="Fb"
                                                    height="24"
                                                    style="
                                                      display: block;
                                                      border: 0;
                                                      outline: none;
                                                      text-decoration: none;
                                                      -ms-interpolation-mode: bicubic;
                                                    "
                                                /></a>
                                              </td>
                                              <td
                                                align="center"
                                                valign="top"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-right: 20px;
                                                "
                                              >
                                                <img
                                                  title="Youtube"
                                                  src="https://dnttuk.stripocdn.email/content/assets/img/social-icons/circle-colored/youtube-circle-colored.png"
                                                  alt="Yt"
                                                  height="24"
                                                  width="24"
                                                  style="
                                                    display: block;
                                                    border: 0;
                                                    outline: none;
                                                    text-decoration: none;
                                                    -ms-interpolation-mode: bicubic;
                                                  "
                                                />
                                              </td>
                                              <td
                                                align="center"
                                                valign="top"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-right: 20px;
                                                "
                                              >
                                                <img
                                                  title="Linkedin"
                                                  src="https://dnttuk.stripocdn.email/content/assets/img/social-icons/circle-colored/linkedin-circle-colored.png"
                                                  alt="In"
                                                  height="24"
                                                  width="24"
                                                  style="
                                                    display: block;
                                                    border: 0;
                                                    outline: none;
                                                    text-decoration: none;
                                                    -ms-interpolation-mode: bicubic;
                                                  "
                                                />
                                              </td>
                                              <td
                                                align="center"
                                                valign="top"
                                                style="padding: 0; margin: 0"
                                              >
                                                <img
                                                  title="X.com"
                                                  src="https://dnttuk.stripocdn.email/content/assets/img/social-icons/circle-colored/x-circle-colored.png"
                                                  alt="X"
                                                  height="24"
                                                  width="24"
                                                  style="
                                                    display: block;
                                                    border: 0;
                                                    outline: none;
                                                    text-decoration: none;
                                                    -ms-interpolation-mode: bicubic;
                                                  "
                                                />
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style="padding: 0; margin: 0"
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            2023 AayChat co. All rights reserved.
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </body>
      </html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendVerificationCode;
