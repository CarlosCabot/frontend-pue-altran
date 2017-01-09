</head>

<body>
 
<?php include("validate_user_access.php") ?>
       
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="inicio.php">ExamifyMe</a> </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="editar_perfil_user.php">Perfil</a></li>
                        <li><a href="logout.php">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row row-offcanvas row-offcanvas-left">
                <div class="col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar" role="navigation">
                    <div id="pic_container">
                        <img id="user_photo" src="../img/users/<?php echo $_SESSION['user_img'];?>" alt="User profile pic">
                        <label id="user_name"><?php echo $_SESSION['user_nombre']; ?> <?php echo $_SESSION['user_apellido1']; ?></label>
                    </div>
                    <ul class="nav nav-sidebar">
                        <li id="li_inicio"><a href="inicio.php">Inicio <span class="sr-only">(current)</span></a></li>
                    </ul>
                    <ul class="nav nav-sidebar">
                        <li id="li_realizar"><a href="realizar_examen.php">Realizar examen</a></li>
                        <li id="li_ver"><a href="ver_examenes.php">Ver exámenes</a></li>
                    </ul>
                </div>
                <!--/span-->
                <div class="col-sm-9 col-md-10 main">
                    <!--toggle sidebar button-->
                    <p class="visible-xs">
                        <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas"><i class="glyphicon glyphicon-chevron-left"></i></button>
                    </p>