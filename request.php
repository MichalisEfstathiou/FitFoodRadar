<?php 
$code="Andreas";
//ini_set('display_errors');

/**********ERROR DISPLAY HEADERS STATUS FUNTION*******************/
function error($errormessage){
	
	//echo $errormessage;
	header('HTTP/1.0 500 Server Error');}

///IF REQUEST METHOD IS POST
if(strcasecmp($_SERVER['REQUEST_METHOD'],'POST')==0){

	if(isset($_SERVER['CONTENT_TYPE'])){
		
		$contentType=$_SERVER['CONTENT_TYPE'];
		
	}
	else $contentType="";

	
	if(strcasecmp($contentType,"application/json")==0){
	
	$json=trim(file_get_contents("php://input"));
		if($json==null||$json==""||$json==false){header('HTTP/1.0 404 Bad Request');}
		else{
	

			$data=json_decode($json,true);				

	
		$connection=mysqli_connect("localhost","chribzej_root",$code) or die(error("Could not connect: " . mysqli_connect_error($connection))) ;
		
	//	echo "Succesfull Connection";
		
		
		mysqli_select_db($connection,"chribzej_products") or die(error("db will not open :" . mysqli_error($connection)));
	//	echo "Database Connected";
   $types=$data['types'];
        $city=$data['location'];
          $category=$data ['category'];
   $description=$data['description'];
          
            $query="SELECT * FROM `Products_Table` WHERE `Products_Table`.`location`='".$city."'";
  if($category!="ALL")
  $query=$query." AND Products_Table.category='".$category."'" ;
  
  
  for ($i = 0; $i < sizeof($types); $i++) {
     $kop =$types[$i];
    $query=$query. " AND  `Products_Table`.`".$kop. "`='1'";
} 
     
    $query=$query. " AND  Products_Table.name LIKE '%".$description."%'";
		    
	//	    		echo $query;
		$result=mysqli_query($connection,$query) or die(error("NOT INSERTED"));
		
                header('HTTP/1.0 201 Created');
                header('Content-type: application/json');
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
	
$response= json_encode($rows);
echo $response;	
mysqli_close($connection);
		}
	}
}


///IF REQUEST METHOD IS GET

 ///IF no get or post request
else {
	header('HTTP/1.0 404 Bad Request');
		echo 'Wrong REQUEST METHOD';
}
?>