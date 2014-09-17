<?php

//Requirements Entity that will be used
class RequirementsEntity {
	public $num;
	public $field;
	public $name;
	public $desc;
	public $bool;

	function __construct($num, $field, $name, $desc, $bool) {
		$this->num = $num;
		$this->field = $field;
		$this->name = $name;
		$this->desc = $desc;
		$this->bool = $bool; 
	}
}

?>