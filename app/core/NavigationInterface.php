<?php
/* 
Path: app/core/NavigationInterface.php
Interface para a navegação entre as páginas
*/

interface NavigationInterface {
    public function getPeriod(): string;
    public function getConta(int $valorInicial): int;
}