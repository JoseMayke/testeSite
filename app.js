

const { exec } = require('child_process');
const express = require('express');
const session = require('express-session');
const bodyPraser = require('body-parser');
const sqlite = require('sqlite3').verbose();

const database = require('./banco/db');
const Salao = require('./banco/salao');
const Descricao = require('./banco/descricao');
// await database.sync();
//const resultado = await database.sync();
//const dados = await Salao.findAll();

/*
class Saloes {
    static async buscaUsuarios(req, resp) {
    try {
        const usuarios = await Salao.Saloes.findAll();
        return resp.render('index', { usuarios: usuarios });
    } catch (error) {
        return resp.status(500).json(error.message);
    };
}; 
} */
/*
//index.js
(async () => {
    const database = require('./banco/db');
    const Salao = require('./banco/salao');
    const Descricao = require('./banco/descricao');
 //   await database.sync({force: true}); // forçar a recriar tabela
    await database.sync();

    const resultadoCreate = await Salao.create({
        nome: 'Cabelos',
        tipo: 'Todos',
        email: 'dm@gmail.com',
        senha: 'dmm@179'
    }) 

    const novoF = await Descricao.create({
        imagem: '',
        texto: ' para vocês!',
        endereco: 'Bairro Canela, rua Centro Esportivo',
        localizacao: 'bbbbbbbb',
        fone: 99787450,
        idSalao: resultadoCreate.id
    }) 
    console.log(resultadoCreate);

    try {
     const resultado = await database.sync();
        console.log(resultado);
 
        const resultadoCreate = await Salao.create({
            nome: 'Danilo Cabelos',
            tipo: 'Masculino',
            email: 'danilo@gmail.com',
            senha: 'danilo@179'
        }) 
        console.log(resultadoCreate); 

        const produtos = await Salao.findByPk(1);
        console.log(produtos);
    } catch (error) {
        console.log(error);
    }


})();
*/
/*
//let db = new sqlite.Database('saloes_banco.db');

/*
let sql = `SELECT DISTINCT nome name FROM contas
           ORDER BY name`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});

db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Feche a conexão do banco de dados.');
});
*/
/*
let sql = `SELECT contasName name,
                  tipo name
           FROM contas
           WHERE contasName  = ?`;
let contasName = 'Thompsom';

// first row only
db.get(sql, [contasName], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  return row
    ? console.log(row.nome, row.tipo)
    : console.log(`Nas contas nome ${contasName}`);

});

// close the database connection
db.close();

*/













const port = 3000;
var path = require('path');
const e = require('express');
const { render } = require('ejs');
const app = express();

app.use(session({secret: 'ghshdduhudshsuddssd'}));
app.use(bodyPraser.urlencoded({extended:true}));

app.use(express.static('assets'));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: false }));


const db_name = path.join(__dirname, "/", "database.sqlite");
const db = new sqlite.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Conexão bem-sucedida com o banco de dados");
});



const sql_create = `CREATE TABLE IF NOT EXISTS contas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);`;

db.run(sql_create, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Création réussie de la table 'contas'");
    // Alimentation de la table
    const sql_insert = `INSERT INTO contas (id, nome, tipo, email, senha) VALUES
    (1,'salao1', 'Masculino', '111@gmail.com', 'aaaaaaa'),
    (2,'salao2', 'Feminino', '222@gmail.com', 'bbbbbbbb'),
    (3,'salao3', 'Masculino', '333@gmail.com', 'cccccccc');`;
    db.run(sql_insert, err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Criação bem-sucedida da tabela");
    });
});









app.get("/", (req, res) => {
    const sql = "SELECT * FROM contas ORDER BY nome"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("index", { model: rows });
    });
});

app.get("/index", (req, res) => {
    const sql = "SELECT * FROM contas ORDER BY nome"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("index", { model: rows });
    });
});


app.get("/cadastro", (req, res) => {
    res.render("cadastro", { model: {} });
});

app.post("/cadastro", (req, res) => {
    const sql = "INSERT INTO contas (nome, tipo, email, senha) VALUES (?, ?, ?, ?)";
    const salao = [req.body.nome, req.body.tipo, req.body.email, req.body.senha];
    db.run(sql, salao, err => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect("cadastro");

    });
});
/*
app.post("/cadastro", (req, res) => {
    const email = req.params.req.body.email;
    const senha = req.body.senha;
    

    const sql1 = "SELECT * FROM contas WHERE email = ?";
    const sql2 = "SELECT * FROM contas WHERE senha = ?";
    db.get(sql1, email, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        console.error("Deu certo");
        db.get(sql2, senha, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            console.error("Deu certo de novo");
            res.render("perfil", { model: row });
        
        });
      
    });

   
});
*/


app.post('/cadastro', (req, res) => {
    let sql = `SELECT * FROM contas WHERE email = "${req.body.email}" AND senha = "${req.body.senha}"`;
    var x;
   
    db.all(sql, (err, rows) => {
     if (err) {
         return console.error(err.message);
     }
     if (!rows) {
       res.status(400);
       res.send('nome de usuário ou senha inválidos');
       return
     }
     rows.forEach((row) => {
       if (row.email === req.body.email && row.senha === req.body.senha) {
           x = 1;
       }
       else {
           x = 2;
           db.close();
       }
     })
     if (x === 1) {
        res.send('Deu certo não');
     
     }
     else { 
         //res.redirect('/');
         res.send('Deu certo não');
         }
    });
});

/*
app.post('/cadastro', (req, res) => {
    const sql = `SELECT * FROM contas WHERE email = "${req.body.email}" AND senha = "${req.body.senha}"`;
   
    db.get(sql, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('perfil',{ model: row.id })
    });
});

*/








app.get('/perfil/:id', function(req,res){
    const id = req.params.id;
    const sql = "SELECT * FROM contas WHERE id = ?";
    db.get(sql, id, (err, row) => {
        if (err) {
            return console.error(err.message);
          }
        res.render('perfil', { model: row });
    });
    
});
/*
app.get('/editarconta', function(req,res){
    res.render('editarconta');
});

app.get('/editarinformacao', function(req,res){
    res.render('editarinformacao');
});

app.get('/horarios', function(req,res){
    res.render('horarios');
});
*/
app.get('/cliente/:id', function(req,res){
    const id = req.params.id;
    const sql = "SELECT * FROM contas WHERE id = ?";
    db.get(sql, id, (err, row) => {
        if (err) {
            return console.error(err.message);
          }
      res.render('cliente', { model: row });
    });
});




/*

app.post('/perfil',function (req, res) {
        res.render('horarios');
});
app.post('/perfil',function (req, res) {
    res.render('editarinformacao');
});

app.post('/perfil',function (req, res) {
    res.render('editarcontas');
});
*/

/*
app.post('/cadastro', function(req,res){
    if(req.body.nomesalao == nome || req.body.tipos == tipo || req.body.cadastroEmail == email || req.body.cadastroEmail2 == email || req.body.cadastroSenha == senha || req.body.cadastroSenhaNovamente == senha){
        res.render('cadastro');
    }else{
        res.render('perfil');
    }
});

*/


app.listen(port, ()=>{
    console.log('Servidor Rodando!');
});

