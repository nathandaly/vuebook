<?php

if (!@include_once __DIR__ . "/vendor/autoload.php") {
    echo 'You need to run `composer install` first.';
    exit;
}

use League\CLImate\CLImate;

$climate = new CLImate();
$dockerBuildDir = './resources/docker/build/';
$editableFiles = [
    'docker' => [
        './docker-compose.yml',
        $dockerBuildDir . 'nginx/default.conf',
    ],
    'xdebug' =>
        $dockerBuildDir . 'php-fpm/.env.example',
    'laravel' => [],
    'vue' => [],
];
$placeHolders = [
    'name' => 'module_[MODULE_NAME]',
    'port' => '${MODULE_PORT}:80 #WEB_PORT',
];
global $climate;

// Entrypoint.
init($climate);

/**
 * Define the callable functions that are available
 *
 * the key should resolve to a function in this file
 * the title is what get's displayed to the user
 *
 * @param CLImate $climate
 * @return void
 */
function init(CLImate $climate)
{
    // Draw the mallcomm picture.
    $climate->addArt('./resources/terminal/')
    ->animation('banner')
    ->enterFrom('bottom');

    $input = $climate->radio('What would you like to do?: ', [
        'setupModule'   => 'Setup Module',
        'developModule' => 'Develop Module',
        'deploy'        => 'Deploy Module',
        'listModules'   => 'List Modules', // Use CLImate table
    ]);

    $response = $input->prompt();
    callFunction($climate, $response);
}

/**
 * Try resolve the response to a function
 *  exit out with an error if there is no matching function
 *
 * @param CLImate $climate
 * @param $response
 */
function callFunction(CLImate $climate, $response)
{
    if (function_exists($response)) {
        $climate->clear();
        $response($climate);
    } else {
        $climate->lightRed('Not Setup Yet.');
        exit(1);
    }
}

/**
 * Setup or update a module by following the prompted questions.
 *
 * @param CLImate $climate
 * @return void
 */
function setupModule(CLImate $climate)
{
    global $editableFiles, $placeHolders;

    $options = [
        'name' => [ // Select a region for the app
            'type' => 'text',
            'text' => 'Module a name<red>*</red>',
            'required' => true,
        ],
        'port' => [ // the name of the whitelabel
            'type' => 'text',
            'text' => 'Module web port',
            'default' => '8080',
        ],
        'xdebug' => [
            'type' => 'text',
            'text' => 'Enable XDebug (y/n)?',
            'default' => 'y',
        ],
    ];

    $climate->blue("Alright, new Module. Let's get started...")->br();

    $values = ask_questions($climate, $options);
    setupXDebug($climate, $values);

    try {
        if (($currentValues = @file_get_contents('./module.json')) && null !== $currentValues) {
            $currentValues = json_decode($currentValues, true);
            $placeHolders['name'] = 'module_' . $currentValues['name'];
            $placeHolders['port'] = $currentValues['port'] . ':80 #WEB_PORT';
        }

        foreach ($editableFiles['docker'] as $file) {
            $content = file_get_contents($file);

            // Assuming case-sensitive search and replace here, as per the `sed` used.
            $content = str_replace($placeHolders['name'], 'module_' . $values['name'], $content);

            if (strpos($file, 'docker-compose') !== false) {
                $content = str_replace($placeHolders['port'], $values['port'] . ':80 #WEB_PORT', $content);
            }

            if (in_array($values['xdebug'], ['n', 'N', 'no', 'NO'])) {
                $content = str_replace('WITH_XDEBUG=true', 'WITH_XDEBUG=false', $content);
            }

            if (!file_put_contents($file, $content)) {
                $climate->error('Could not to write to file ' . $file);
                exit(1);
            }

            if (!file_put_contents('./module.json', json_encode($values))) {
                $climate->error('Could to write to file module.json');
                exit(1);
            }
        }
    } catch (Exception $e) {
        $climate->error($e->getMessage());
        exit(1);
    }

    $climate->br()->lightGreen('Module setup complete.');
}

/**
 * Commands for module development.
 *
 * @param CLImate $climate
 * @return void
 */
function developModule(CLImate $climate)
{
    if (!@file_get_contents('./module.json')) {
        $climate->error('Please run module setup before running the development options.');
        exit(1);
    }

    $input = $climate->radio('What would you like to do?: ', [
        'up'    => 'Start Container',  // Maybe check the module port has been saved?
        'down'  => 'Stop Container',
        'watch' => 'Watch',
        'hot'   => 'Hot',
        'build' => 'Build',
    ]);

    $response = $input->prompt();

    switch ($response) {
        case 'up':
            exec('docker-compose up -d');
            break;

        case 'down':
            exec('docker-compose down');
            break;

        case 'watch':
            exec('npm run dev');
            break;

        case 'hot':
            exec('npm run hot');
            break;

        case 'build':
            $input = $climate->radio('What environment do you want to build for?: ', [
                'dev'  => 'Development',
                'test'   => 'Testing',
                'prod'  => 'Production',
            ]);

            $env = $input->prompt();
            exec('npm run ' . $env);
            break;
    }
}

/**
 * Setup PHP container .env XDebug values.
 *
 * @param CLImate $climate
 * @param array $values
 * @return void
 */
function setupXDebug(CLImate $climate, array $values)
{
    global $editableFiles;
    $xdebugQuestions = [
        'serverName' => [
            'type' => 'text',
            'text' => "Server Name",
            'default' => 'local.dev',
        ],
        'hostIP' => [
            'type' => 'text',
            'text' => "Host IP (output from ifconfig/ipconfig)",
            'required' => true,
        ]
    ];

    if (!in_array($values['xdebug'], ['y', 'Y', 'YES'])) {
        return;
    }

    $values = ask_questions($climate, $xdebugQuestions);
    $content = file_get_contents($editableFiles['xdebug']);

    // Assuming case-sensitive search and replace here, as per the `sed` used.
    $content = str_replace('{{ SERVER_NAME }}', $values['serverName'], $content);
    $content = str_replace('{{ HOST_IP }}', $values['hostIP'], $content);

    if (!file_put_contents(rtrim($editableFiles['xdebug'], '.example'), $content)) {
        $climate->error('Could not to write to file ' . $editableFiles['xdebug']);
        exit(1);
    }

}

/**
 * Makes a value in the questions function required by re prompting the answer
 * returns the value the user entered
 *
 * @param $climate
 * @param $item
 * @param $value
 * @return mixed
 */
function required_field($climate, $item, $value)
{
    if (empty($value)) {
        $input = $climate->input($item['text']. ": <red>Required</red>");
        $value = $input->prompt();
        $value = required_field($climate, $item, $value);
    }

    return $value;
}

/**
 * Asks user a list of questions and returns an array of answers.
 *
 * The questions array can contina the following values for each question
 *
 * @param $climate
 * @param $questions
 * @return array
 * type: text|boolean|choose text allows user to input text, boolean allows users to
 *      choose between yes and no, choose is an array of options for the user to select from
 *
 * text: the text that gets showed to the users
 *
 * default: the default value for the field
 *
 * required: true|false whether the values is required or not, currently only works for text
 *
 * options: [] used only for choose field types key value select options
 */
function ask_questions($climate, $questions)
{
    $values = [];

    foreach ($questions as $key => $question) {
        // Display question.
        $text = ($question['default'] !== null) ? $question['text'] . ' ('.$question['default']. ') ': $question['text'];
        $value = null;

        // Handle the boolean question type.
        if ($question['type'] == 'boolean') {
            $input = $climate->confirm($text . ": ");
            $value = $input->confirmed();
        }

        // Hangle the select type.
        if ($question['type'] == 'choose') {
            $input = $climate->radio($text . ": ", $question['options']);
            $value = $input->prompt();
        }

        // Handle the text response question type.
        if ($question['type'] == 'text') {
            $input = $climate->input($text . ": ");
            $value = $input->prompt();
            $value = (isset($question['required']) && $question['required'] == true) ? required_field($climate, $question, $value) : $value;
            $value = (empty($value)) ? $question['default'] : $value;
        }

        $values[$key] = $value;
    }

    return $values;
}
