<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="img/favicon/favicon.ico">
    <title>ExamifyMe Homepage</title>
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/jumbotron.css" rel="stylesheet">    
    <!-- Custom styles for this template -->
    <link href="css/carousel.css" rel="stylesheet">
    <!-- Custom styles index -->
    <link href="css/index.css" rel="stylesheet">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">    
  </head>

  <body>
    <!--database connection-->
    <?php include("web-app/php/conexion.php") ?>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">ExamifyMe</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">   
         
          <form class="navbar-form navbar-right" action="#" onsubmit="login_usuario(); return false">             
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control" name="login" required>
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control" name="password" required>
            </div>
            <button type="submit" class="btn btn-success">Iniciar sesión</button>
            <a href="web-app/registro_usuario.html" class="btn btn-success" role="button">Registrarse</a>
            <div id="error_login">
                <i class="fa fa-ban" aria-hidden="true"></i><span id="mensaje_error"></span>
            </div>    
          </form>
          
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

    <!-- Carousel
    ================================================== -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img class="first-slide" src="img/carousel/carousel1.jpg" alt="Apuntes">          
          <div class="container">
            <div class="carousel-caption">
              <h1>Accesible</h1>
              <p>Te puedes registrar facilmente</p>
            </div>
          </div>
        </div>
        <div class="item">
          <img class="second-slide" src="img/carousel/carousel2.jpg" alt="Libro abierto">
          <div class="container">
            <div class="carousel-caption">
              <h1>Preguntas actualizadas</h1>
              <p>Nuestras preguntas estan acordes a las tecnologias de ahora.</p>
            </div>
          </div>
        </div>
        <div class="item">
          <img class="third-slide" src="img/carousel/carousel3.jpg" alt="Libro abierto secundario">
          <div class="container">
            <div class="carousel-caption">
              <h1>En el momento</h1>
              <p>Sabras tu resultado al terminar el examen.</p>
            </div>
          </div>
        </div>
      </div>
      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div><!-- /.carousel -->


    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container marketing">

      <!-- Three columns of text below the carousel -->
      <div class="row">
        <div class="col-lg-4">
          <img class="img-circle" src="img/thumbs.png" alt="Imagen de un lapiz" title="Lapiz" width="140" height="140">
          <h2>Apto para cualquier nivel</h2>
          <p> Tanto si quieres repasar como aumentar tus conocimientos.</p>
        
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img class="img-circle" src="img/code.jpg" alt="Imagen de una estanteria con libros" title="Libros" width="140" height="140">
          <h2>HTML/CSS/Javascript</h2>
          <p> Amplia oferta de temas y exámenes. Selecciona el que más te interese y practica facilmente.</p>
          
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img class="img-circle" src="img/AprobadoPorChuckNorrisNegro.png" alt="Imagen de una libreta" title="Libreta" width="140" height="140">
          <h2>Garantía</h2>
          <p> La alta fiabilidad nos avala.</p>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->


      <!-- START THE FEATURETTES -->

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">Examínate</h2>
          <p class="lead">Para practicar tiene a su disposición un amplio abanico de exámenes creados para ejercitar su conocimiento. Cuando tenga la seguridad de haber aprendido el tema, rinda su exámen definitivo y obtenga su resultado al momento. </p>
        </div>
        <div class="col-md-5">
          <img class="featurette-image img-responsive center-block" src="img/examinate.jpg" title="Haciendo Examen" alt="Alumnos haciendo examenes">
        </div>
      </div>

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7 col-md-push-5">
          <h2 class="featurette-heading">Usuarios</h2>
          <p class="lead">Crear una cuenta de usuario es sencillo y toma menos de 1 minuto. A través de tu area personal podrás realizar las pruebas para practicar, ver tus resultados, repasar tus respuesta y finalmente acceder a los exámenes oficiales.</p>
          
        </div>
        <div class="col-md-5 col-md-pull-7">
          <img class="featurette-image img-responsive center-block" src="img/computer_user_happy.jpg" title="Gente examinandose" alt="Alumnos haciendo examenes">
        </div>
      </div>

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">Clientes satisfechos</h2>
            <p class="lead"><i>"Me ha sido de gran utilidad para examinarme de las materias que estoy aprendiendo. Recomendaría practicar con ExamifyMe a todos mis compañeros de clase"</i><br><span style="float:right;margin-right:15px;">Daniel Sanchez</span></p>
        </div>
        <div class="col-md-5">
          <img class="featurette-image img-responsive center-block" src="img/satisfied-customer.jpg" title="Estudiando" alt="Alumno satisfecho" style="border:1px solid #d8d8d8;">
        </div>
      </div>

      <hr class="featurette-divider">

      <!-- /END THE FEATURETTES -->


      <!-- FOOTER -->
      <footer>
        <p class="pull-right"><a href="#"><i class="fa fa-arrow-circle-up fa-4x" aria-hidden="true"></i></a></p>
        <p>&copy; 2016 PUE &middot;</p>
        <i class="fa fa-facebook fa-3x"></i>
        <i class="fa fa-twitter fa-3x"></i>
        <i class="fa fa-google-plus fa-3x"></i>            
        <i class="fa fa-github fa-3x"></i>
         

      </footer>

    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/vendor/holder.min.js"></script>
    <script src="js/index.js"></script>

  </body>
</html>
