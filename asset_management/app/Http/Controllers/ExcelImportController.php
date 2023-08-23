<?php

namespace App\Http\Controllers;

use App\Models\Allocation;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

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

            if ($column1 !== null && substr($column1, 0, 1) !== '0') {
                // Display an error message
                return response()->json(['error' => 'Número de inventário inválido: deve iniciar por 0!'], 400);
            }


            // Check if state is valid (either "Ativo" or "Inativo")
            if ($column3 !== 'Ativo' && $column3 !== 'Inativo') {
                // Display an error message
                return response()->json(['error' => 'Campo Estado inválido: verifique of critérios!'], 400);
            }

            if ($column5 !== 'Novo' && $column5 !== 'Usado' && $column5 !== 'Obsoleto' && $column5 !== 'Reparação') {
                return response()->json(['error' => 'Campo Condição inválido: verifique os critérios!'], 400);
            }

            if ($column6 !== 'B' && $column6 !== 'C' && $column6 !== 'D' && $column6 !== 'E' && $column6 !== null) {
                return response()->json(['error' => 'Campo Ala inválido:'], 400);
            }

            if ($column7 !== '-1' && $column7 !== '0' && $column7 !== '1' && $column7 !== '2' && $column7 !== '3' && $column7 !== '4' && $column7 !== '5' && $column7 !== null) {
                return response()->json(['error' => 'Campo Piso inválido: verifique os critérios!'], 400);
            }

            // Insert the data into the MySQL database
            $assetId = DB::table('assets')->insertGetId([
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
                'import_type' => 'bulk',

                'updated_at' => now(),
                'created_at' => now(),

            ]);
            // Create a new allocation record
            $allocation = new Allocation([
                'asset_id' => $assetId,
                'user_id' => auth()->user()->name,
                'allocation_date' => now(),
                'action_type' => 'Adiciona',
                'inv_number' => $column1,
                'reason' => "",
            ]);

            // Save the allocation record
            $allocation->save();
        }


        // Close the file handle
        fclose($handle);

        // Return a response indicating the success of the import
        return response()->json(['message' => 'Ficheiro .csv importado com sucesso!']);
    }


    public function downloadTemplate()
    {
        // Path to the template file
        $templatePath = storage_path('app/template.csv');

        // Define the file name
        $fileName = 'template.csv';

        // Generate the response to download the file
        return Response::download($templatePath, $fileName);
    }
}
