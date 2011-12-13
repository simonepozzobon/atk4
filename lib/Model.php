<?php
/**
   * Implementation of the model where you can define fields, conditions, validations
   * but does not related with any storage media
   */
class Model extends AbstractModel implements ArrayAccess,Iterator {

    public $default_exception='Exception';
    public $entity_code;

    public $field_class='Model_Field';

    // Curretly loaded record
    public $data=array();

    public $dirty=array();

    function init(){
        parent::init();

        if(method_exists($this,'defineFields'))
            throw $this->exception('model->defineField() is obsolete. Change to init()','Obsolete')
            ->addMoreInfo('class',get_class($this));
    }
    function addField($name){
        return $this
            ->add($this->field_class,$name);
    }
    function set($name,$value=undefined){
        if(is_array($name)){
            foreach($name as $key=>$val)$this->set($key,$val);
            return $this;
        }
        if($name===false || $name===null){
            return $this->reset();
        }

        // Verify if such a filed exists
        //if(!$this->hasElement($name))throw $this->exception('No such field','Logic')->addMoreInfo('name',$name);

        if($value!==undefined){
            $this->data[$name]=$value;
            $this->setDirty($name);
        }
        return $this;
    }
    function setDirty($name){
        $this->dirty[$name]=true;
    }

    function loaded(){
        return (boolean)$this->data;
    }

    function reset(){
        $this->data=$this->dirty=array();
        return $this;
    }

    // {{{ ArrayAccess support 
    function offsetExists($name){
        return $this->hasElement($name);
    }
    function offsetGet($name){
        return $this->get($name);
    }
    function offsetSet($name,$val){
        $this->set($name,$val);
    }
    function offsetUnset($name){
        unset($this->dirty[$name]);
    }
    // }}}

    // {{{ Iterator support 
    private $once=false;
    function rewind(){}
    function next(){}
    function current(){
        return $this->get();
    }
    function key(){
        return $this->get('id');
    }
    function valid(){
        $once=$this->once;
        $this->once=false;
        return $once;
    }
    // }}}

    function get($name=undefined){
        if($name===undefined)return $this->data;
        //if(!$this->hasElement($name))throw $this->exception('No such field','Logic')->addMoreInfo('name',$name);
        return $this->data[$name];
    }


    // TODO: worry about cloning!
    function newField($name){
        return $this->addField($name); 
    }
    function getEntityCode(){
        return $this->entity_code;
    }
    function getField($f){
        return $this->getElement($f);
    }

}