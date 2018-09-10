<table id="tablaUsuarios">
    <thead>
        <tr>
            <th> Nombre </th>
            <th> Correo </th>
            <th> Telefono </th>
            <th> Seleccionar </th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($usuarios as $usuario) : ?>
            <tr>
                <td> <?=$usuario->nombre?> <?=$usuario->apellidoPaterno ?> </td>
                <td> <?= $usuario->correo ?></td>
                <td> <?= $usuario->telefono ?></td>
                <td>
                    <label>
                        <input type="radio" name="lider" value="<?=$usuario->idUsuario?>"/>
                        <span></span>
                    </label>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>                           
</table>

                                