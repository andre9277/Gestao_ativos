<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExcelImportController extends Controller
{

    public function import(Request $request)
    {
        // Retrieve the uploaded file
        $file = $request->file('file');


        //Retrieve the selected option values
        $brandId = $request->input('brand_id');
        $catId = $request->input('cat_id');
        $supplierId = $request->input('supplier_id');
        $entId = $request->input('ent_id');
        $unitId = $request->input('unit_id');
        $modelId = $request->input('model_id');

        // Specify the path where the uploaded file will be stored temporarily
        $filePath = $file->getRealPath();

        // Open the file for reading
        $handle = fopen($filePath, 'r');

        // Skip the first row if it contains column headers
        fgetcsv($handle);

        // Read the file line by line
        while (($row = fgetcsv($handle, 1000, ',')) !== false) {


            // Access the data from each column in the row

            $column1 =  $row[0];
            $column2 =  $row[1];
            $column3 =  $row[2];
            $column4 =  $row[3];
            $column5 =  $row[4];
            $column6 =  $row[5];
            $column7 =  $row[6];
            $column8 =  $row[7];


            // Check and set empty values to NULL
            $column1 = $column1 !== '' ? $column1 : null;
            $column2 = $column2 !== '' ? $column2 : null;
            $column3 = $column3 !== '' ? $column3 : null;
            $column4 = $column4 !== '' ? $column4 : null;
            $column5 = $column5 !== '' ? $column5 : null;
            $column6 = $column6 !== '' ? $column6 : null;
            $column7 = $column7 !== '' ? $column7 : null;
            $column8 = $column8 !== '' ? $column8 : null;

            // Perform any necessary data validation and transformation





            // Insert the data into the MySQL database
            DB::table('assets')->insert([
                'numb_inv' => $column1,
                'date_purch' => $column2,
                'state' => $column3,
                'numb_ser' => $column4,
                'cond' => $column5,
                'ala' => $column6,
                'floor' => $column7,
                'ci' => $column8,
                //-----
                'brand_id' => $brandId,
                'cat_id' => $catId,
                'supplier_id' => $supplierId,
                'ent_id' => $entId,
                'unit_id' => $unitId,
                'model_id' => $modelId,

                'updated_at' => now(),
                'created_at' => now(),

            ]);
        }

        // Close the file handle
        fclose($handle);

        // Return a response indicating the success of the import
        return response()->json(['message' => 'Excel file imported successfully']);
    }
}
