#include <iostream>
#include <dirent.h>
#include <sys/types.h>

void writeStringToFile(FILE* file, std::string str){
    for(int a = 0; a < str.length(); a++){ fprintf(file, "%c", str[a]); }
}

void makeManifestHere(std::string address){
	std::cout << "Manifesting: " << address << std::endl;
    DIR* directory = opendir(address.c_str());
    dirent* directory_element = readdir( directory );
    FILE* output = fopen((address+"manifest").c_str(), "w");
    std::string fileName; std::string resultLine; bool firstRun = true;

    while(directory_element != NULL){
        if(std::string( directory_element->d_name )[0] != '.' && std::string( directory_element->d_name ).compare("manifest")){
            if(!firstRun){writeStringToFile(output, "\n");} firstRun = false;
            resultLine = std::string("{");

            //assemble name
            resultLine += std::string("\"") + std::string("name") + std::string("\"");
            resultLine += std::string(":");       
            resultLine += std::string("\"") + std::string( directory_element->d_name ) + std::string("\"");    
            resultLine += std::string(",");   
            resultLine += std::string("\"") + std::string("type") + std::string("\"");
            resultLine += std::string(":");    

            //assemble type DT_REG or DT_DIR
            resultLine += std::string("\"");
            if(directory_element->d_type == DT_DIR){resultLine += std::string("dir");}else{resultLine += std::string("file");}
            resultLine += std::string("\"");

            resultLine += std::string("}");

            writeStringToFile(output, resultLine);
        }
        directory_element = readdir( directory );
    }
	fclose(output);
	closedir( directory );
}

void recursiveSearch(std::string address){
    makeManifestHere(address);

    DIR* directory = opendir(address.c_str());
    dirent* directory_element = readdir( directory );

    while(directory_element != NULL){
        if(directory_element->d_name[0] != '.' && directory_element->d_type == DT_DIR){ recursiveSearch(address + directory_element->d_name + "/"); }
        directory_element = readdir( directory ); 
    }
	closedir( directory );
}

int arrayCount(char* array){
    int a = 0; while(array[a] != '\0'){ a++; }
    return a;
}

int main(int argumentCount, char *arguments[]){
    if(argumentCount <= 1){ std::cout << "Manifester failed to start - no arguments provided" << std::endl; }
    else if(argumentCount > 2){ std::cout << "Manifester failed to start - too many arguments provided" << std::endl; }
    else{
        std::string input; int a = 0;
        while(arguments[1][a] != '\0'){ input += arguments[1][a++]; }

        if(input[input.length()-1] == '/'){ recursiveSearch(input); }
        else{ recursiveSearch(input+"/"); }           
    }
    return 0;
}